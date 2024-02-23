"""creates a dataset of normalized coordinates."""

import os
from torchvision.io import read_video
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
for i in BOTH_ARM_MARKERS:
    columns.extend([f"x{i}", f"y{i}", f"z{i}"])
columns.append("stage")
dataset = pd.DataFrame(columns=columns)
CLASSES = [
    "Stage1",
    "Stage2",
    "Stage3",
    "Stage4",
    "Stage5",
    "Stage6",
    "Stage7",
    "Stage8",
]
# CLASSES = ['Stage1']
detector = create_detector("pose_landmarker_lite.task")
plotted = 0
for i, clas in enumerate(CLASSES):
    for file in os.listdir(os.path.join("RData", clas)):
        if file.split(".")[-1] == "mp4":
            sys.stdout.write(f"\rProcessing: {file}")
            sys.stdout.flush()
            video = read_video(os.path.join("RData", clas, file), pts_unit="sec")
            # video[0].shape -> (frames, height, width, channels)
            for frame in video[0]:
                mp_image = mp.Image(
                    image_format=mp.ImageFormat.SRGB, data=frame.numpy()
                )
                detection_result = detector.detect(mp_image)
                if len(detection_result.pose_landmarks) < 1:
                    continue
                pose_landmarks = detection_result.pose_landmarks[0]
                left_hip = pose_landmarks[LEFT_HIP]
                right_hip = pose_landmarks[RIGHT_HIP]
                center = (
                    (left_hip.x + right_hip.x) / 2,
                    (left_hip.y + right_hip.y) / 2,
                    (left_hip.z + right_hip.z) / 2,
                )
                translated_landmarks = []
                for j in BOTH_ARM_MARKERS:
                    translated_landmarks.extend(
                        [
                            pose_landmarks[j].x - center[0],
                            pose_landmarks[j].y - center[1],
                            pose_landmarks[j].z - center[2],
                        ]
                    )
                dataset.loc[len(dataset)] = translated_landmarks + [i]
                if plotted < 5 and random.randint(0, 1000) == 0:
                    plotted += 1
                    annotated_image = draw_landmarks_on_image(
                        frame.numpy(), detection_result
                    )
                    plt.subplot(1, 5, plotted)
                    plt.imshow(annotated_image)
                    plt.title(clas)
dataset["stage"] = dataset["stage"].astype(int)
dataset.to_csv("coord_dataset.csv")
print("\nDone processing!")
plt.show()
