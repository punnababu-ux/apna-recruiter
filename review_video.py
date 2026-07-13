import cv2

cap = cv2.VideoCapture('/Users/punna.babu/poneglyph_ag/eleven.mp4')
success, frame = cap.read()
frames = []
count = 0
while success:
    if count % 30 == 0:
        cv2.imwrite(f'/Users/punna.babu/poneglyph_ag/frame_{count}.jpg', frame)
    success, frame = cap.read()
    count += 1
cap.release()
print(f"Extracted {count} frames.")
