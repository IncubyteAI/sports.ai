import cv2
import json
import os

video_dir = "/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RTennisServes"

for video_name in os.listdir(video_dir):
    if video_name.endswith(".mp4"):
        tag = video_name[:-4]
        folder_path = f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/{tag}"

        with open(
            f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RStages-Ann/{tag}.mp4.json",
            "r",
        ) as file:
            data = json.load(file)

        cap = cv2.VideoCapture(
            f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RTennisServes/{tag}.mp4"
        )

        os.makedirs(folder_path, exist_ok=True)

        for stage in data["tags"]:
            start_frame, end_frame = stage["frameRange"]

            cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

            for i in range(start_frame, end_frame + 1):
                ret, frame = cap.read()
                if not ret:
                    break

                cv2.imwrite(
                    os.path.join(folder_path, f'{tag}_{stage["name"]}_frame_{i}.png'),
                    frame,
                )

        cap.release()
