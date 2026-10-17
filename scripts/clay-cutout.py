"""Remove a flat light background from a 3D render, keeping a soft shadow.
Background = pixels connected to the image border that are either close to
the backdrop colour or a neutral darkening of it (the contact shadow), so
light parts *inside* the object stay opaque.  usage: python scripts/clay-cutout.py in.png out.png   (needs numpy + pillow)

Used for the marketing pages' 3D clay objects (public/images/company/values),
which the image generator returns on a flat light-gray backdrop. Resize the
result to 640×640 before committing."""
import sys
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

src = np.asarray(Image.open(sys.argv[1]).convert("RGB")).astype(np.float32)
h, w, _ = src.shape
corners = np.concatenate([src[:24, :24], src[:24, -24:], src[-24:, :24], src[-24:, -24:]]).reshape(-1, 3)
bg = np.median(corners, axis=0)
W = np.array([0.299, 0.587, 0.114], np.float32)
lum = src @ W
bg_l = float(bg @ W)
chroma = src.max(-1) - src.min(-1)
dist = np.linalg.norm(src - bg, axis=-1)

near = dist < 9
shadowish = (chroma < 9) & (lum < bg_l) & (lum > bg_l - 70)
grow = near | shadowish

seen = np.zeros((h, w), bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if grow[y, x] and not seen[y, x]:
            seen[y, x] = True; q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if grow[y, x] and not seen[y, x]:
            seen[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not seen[ny, nx] and grow[ny, nx]:
            seen[ny, nx] = True; q.append((ny, nx))

# Enclosed holes (a key's bow): any sizeable patch that matches the backdrop
# closely is background too, even if the border fill can't reach it.
strict = dist < 6
lab = np.zeros((h, w), np.int32); cur = 0
for sy in range(h):
    for sx in range(w):
        if strict[sy, sx] and not seen[sy, sx] and lab[sy, sx] == 0:
            cur += 1; comp = [(sy, sx)]; lab[sy, sx] = cur; dq = deque([(sy, sx)])
            while dq:
                y, x = dq.popleft()
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and strict[ny, nx] and not seen[ny, nx] and lab[ny, nx] == 0:
                        lab[ny, nx] = cur; comp.append((ny, nx)); dq.append((ny, nx))
            if len(comp) > 600:
                ys, xs = zip(*comp); seen[list(ys), list(xs)] = True

obj = ~seen
# Soften the object edge by a pixel or two.
obj_a = np.asarray(Image.fromarray((obj * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32) / 255
shadow_a = np.where(seen, np.clip((bg_l - lum) / bg_l * 2.4, 0, 0.5), 0)
alpha = np.maximum(obj_a, shadow_a)
col = np.where((obj_a >= shadow_a)[..., None], src, 0)
out = np.dstack([col, alpha * 255]).astype(np.uint8)
Image.fromarray(out, "RGBA").save(sys.argv[2], optimize=True)
print(sys.argv[2].split('/')[-1], "bg", bg.round(), "object%", round(float(obj.mean() * 100), 1))
