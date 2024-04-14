"""creates a dataset of normalized coordinates."""

import os
import sys
sys.path.append('/Users/tanayagrawal/sports-ai')
from torchvision.io import read_image
from pose.mp_utils import create_detector, draw_landmarks_on_image
import mediapipe as mp
import random
import matplotlib.pyplot as plt
import numpy as np
from pose.mp_utils import *
import pandas as pd
from tqdm import tqdm
import sys

columns = []
for i in ALL_LIMB_MARKERS:
    columns.extend([f"x{i}", f"y{i}", f"z{i}"])
columns.append("video_name")
columns.append("frame_index")
dataset = pd.DataFrame(columns=columns)

detector = create_detector("pose_landmarker_lite.task")

# Directory containing all video folders
video_directory = "/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData"

# Initialize variables
current_video_frames = []
current_video_name = None

# Iterate over each video folder
for video_folder in os.listdir(video_directory):
    video_folder_path = os.path.join(video_directory, video_folder)
    
    # Check if it's a directory
    if os.path.isdir(video_folder_path):
        # Reset current_video_frames for the new video
        current_video_frames = []
        current_video_name = video_folder
        
        # Iterate over each PNG frame in the video folder
        for frame_index, frame_file in enumerate(tqdm(os.listdir(video_folder_path), desc=f"Processing {video_folder}")):
            if frame_file.endswith(".png"):
                frame_path = os.path.join(video_folder_path, frame_file)
                # Load the image
                image = read_image(frame_path)

                # Convert the PyTorch tensor to a NumPy array and ensure it's of type uint8
                image_np = np.array(image, dtype=np.uint8)

                # Ensure the image is in the correct shape. MediaPipe expects the shape to be (height, width, channels).
                # If the image is not in this shape, you might need to transpose it.
                if image_np.ndim == 2:
                    # Grayscale image, add an extra dimension for channels
                    image_np = np.expand_dims(image_np, axis=-1)
                elif image_np.shape[0] == 3:
                    # The image might be in the shape (channels, height, width), transpose it to (height, width, channels)
                    image_np = np.transpose(image_np, (1, 2, 0))

                # Process the image with the detector
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_np)
                detection_result = detector.detect(mp_image)
                
                if detection_result.pose_landmarks:
                    pose_landmarks = detection_result.pose_landmarks[0]
                    left_hip = pose_landmarks[LEFT_HIP]
                    right_hip = pose_landmarks[RIGHT_HIP]
                    center = (
                        (left_hip.x + right_hip.x) / 2,
                        (left_hip.y + right_hip.y) / 2,
                        (left_hip.z + right_hip.z) / 2,
                    )
                translated_landmarks = []
                for j in ALL_LIMB_MARKERS:
                    translated_landmarks.extend(
                        [
                            pose_landmarks[j].x - center[0],
                            pose_landmarks[j].y - center[1],
                            pose_landmarks[j].z - center[2],
                        ]
                    )
                    
                    # Append translated_landmarks to current_video_frames
                dataset.loc[len(dataset)] = translated_landmarks + [video_folder] + [frame_index]

dataset.to_csv("all_coords_dataset_2.csv")
print("Done processing!")