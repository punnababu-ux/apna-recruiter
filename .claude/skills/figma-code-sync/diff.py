import re, sys, collections
D = sys.argv[1] if len(sys.argv) > 1 else "."
SKIP = {"E7 desktop", "E8 desktop", "C1 desktop"}  # contaminated captures

def sections(path):
    cur, out = None, collections.OrderedDict()
    for line in open(path):
        line = line.rstrip("\n")
        if line.startswith("== "):
            cur = line[3:].strip(); out[cur] = []
        elif cur and " | " in line:
            out[cur].append(line)
    return out

def parse(line):
    p = [x.strip() for x in line.split(" | ")]
    text, sw, col = p[0], p[1], p[2]
    size, weight = (sw.split() + ["?"])[:2]
    m = re.search(r"~(#[0-9a-f]{6})(?:/(\d+))?", col)
    hx, a = (m.group(1), int(m.group(2) or 100)) if m else (None, 100)
    tok = col.split(" ~")[0]
    flags = " ".join(f for f in ("italic", "strike") if f in col)
    return dict(text=text, size=float(size) if size.replace(".", "").isdigit() else size, weight=weight,
                hex=hx, a=a, tok=tok, flags=flags, id=p[3] if len(p) > 3 else "", comp=p[4] if len(p) > 4 else "")

def close(a, b):
    if not a or not b: return True
    return all(abs(int(a[i:i+2], 16) - int(b[i:i+2], 16)) <= 6 for i in (1, 3, 5))

code = {}
for h, lines in sections(f"{D}/code/all.txt").items():
    m = re.match(r"(\S+)\s+(phone|desktop)", h)
    if not m: continue
    key = f"{m.group(1)} {m.group(2)}"
    if key in SKIP: continue
    code[key] = [parse(l) for l in lines]  # later captures win

groups = collections.defaultdict(list)
unmatched = []
for h, lines in sections(f"{D}/figma/all.txt").items():
    m = re.match(r"\S+ (D-)?(\S+)", h)
    key = f"{m.group(2)} {'desktop' if m.group(1) else 'phone'}"
    if key not in code: unmatched.append(key); continue
    by = collections.defaultdict(list)
    for c in code[key]: by[c["text"]].append(c)
    for l in lines:
        f = parse(l)
        cs = by.get(f["text"])
        if not cs: continue
        if any(c["size"] == f["size"] and c["weight"] == f["weight"] and close(c["hex"], f["hex"]) and abs(c["a"] - f["a"]) < 8 and c["flags"] == f["flags"] for c in cs):
            continue
        c = cs[0]
        diff = []
        if c["size"] != f["size"]: diff.append(f"size {f['size']}→{c['size']}")
        if c["weight"] != f["weight"]: diff.append(f"weight {f['weight']}→{c['weight']}")
        if not close(c["hex"], f["hex"]) or abs(c["a"] - f["a"]) >= 8:
            diff.append(f"colour {f['tok']}{'/'+str(f['a']) if f['a']<100 else ''}→{c['tok']}{'/'+str(c['a']) if c['a']<100 else ''}")
        if c["flags"] != f["flags"]: diff.append(f"style '{f['flags']}'→'{c['flags']}'")
        groups[(f["comp"], "; ".join(diff))].append((key, f["text"], f["id"]))

for (comp, d), items in sorted(groups.items(), key=lambda kv: (kv[0][0], -len(kv[1]))):
    texts = sorted({t for _, t, _ in items})
    screens = sorted({k for k, _, _ in items})
    print(f"[{comp}] {d}  ×{len(items)}  texts: {'; '.join(texts)[:160]}  screens: {', '.join(screens)[:120]}")
print("\nno code capture:", ", ".join(sorted(set(unmatched))))
