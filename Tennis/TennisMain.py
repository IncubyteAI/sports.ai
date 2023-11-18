# Copyright Tanay Agrawal July 2023
# Runs and displays the pose estimation module results on a video file - adapted from https://www.youtube.com/watch?v=brwgBf6VB0I

import cv2
import os
import numpy as np
import time
import PoseModule as pm
import json
import matplotlib.pyplot as plt

name = "R1ca12"

video_path = f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RTennisServes/{name}.mp4"
json_file_path = f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RStages-Ann/{name}.mp4.json"

cap = cv2.VideoCapture(video_path)
detector = pm.PoseDetector()
pTime = 0
wristPoint = []
paused = False
repeat = True


# def read_json(json_file_path):
#     with open(json_file_path, 'r') as file:
#         data = json.load(file)

#     annotations = data['tags']
#     sorted_annotations = sorted(annotations, key=lambda x: int(x['name'][6:]))

#     return sorted_annotations

# sorted_annotations = read_json(json_file_path)

while True:
    if not paused:
        success, img = cap.read()
        if not success:
            if repeat:
                cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                success, img = cap.read()
            else:
                break
        img = detector.find_pose(img, True)
        lmList = detector.find_position(img, False)

        if len(lmList) != 0:
            if "left" in video_path:
                angle = detector.find_angle(img, 11, 13, 15, 0, 255, 0)
            else:
                angle = detector.find_angle(img, 12, 14, 16, 0, 255, 0)

            # wristPoint.append((int(lmList[16][1]), int(lmList[16][2])))

        # for i in range(len(wristPoint) - 1):
        #     cv2.line(img, wristPoint[i], wristPoint[i + 1], (0, 0, 255), 2)

        # stage frame stuff
        # frame_number = int(cap.get(cv2.CAP_PROP_POS_FRAMES))
        # current_stage = None

        # for annotation in sorted_annotations:
        #     start_frame, end_frame = annotation['frameRange']
        #     if start_frame <= frame_number <= end_frame:
        #         current_stage = annotation['name']
        #         break

        # if current_stage is not None:
        #     # Display the current stage on the frame
        #     cv2.putText(img, current_stage, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

        cv2.imshow(str(video_path), img)
        pTime = time.time()
    else:
        cv2.imshow(str(video_path), img)

    key = cv2.waitKey(200)
    if key == ord("q"):
        break
    elif key == ord(" "):
        paused = not paused

    if not repeat and not success:
        break

total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

cv2.destroyAllWindows()
cap.release()
