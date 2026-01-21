import cv2
import os

# Input video path
video_path = 'Keyboard Video.mp4'
output_folder = 'public/frames'

# Create output folder
os.makedirs(output_folder, exist_ok=True)

# Open video
cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print(f"Error: Could not open video file {video_path}")
    exit(1)

fps = cap.get(cv2.CAP_PROP_FPS)
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

print(f"Video FPS: {fps}")
print(f"Total frames: {total_frames}")

frame_count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Upscale to 1440p (2560x1440) for better quality
    target_size = (2560, 1440)
    frame = cv2.resize(frame, target_size, interpolation=cv2.INTER_LANCZOS4)

    # Save frame as PNG (lossless, maximum quality)
    # Using zfill(5) to match application expectation: 00001.png, 00002.png...
    frame_filename = os.path.join(output_folder, f'{str(frame_count + 1).zfill(5)}.png')
    
    # Use highest quality PNG settings
    cv2.imwrite(frame_filename, frame, [cv2.IMWRITE_PNG_COMPRESSION, 0])
    
    frame_count += 1
    if frame_count % 10 == 0:
        print(f"Extracted {frame_count}/{total_frames} frames")

cap.release()
print(f"\nDone! Extracted {frame_count} frames to {output_folder}")
