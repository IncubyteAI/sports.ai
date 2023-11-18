import cv2
import json
import os

video_dir = "/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RTennisServes"

# Define the codec using VideoWriter_fourcc and create a VideoWriter object
fourcc = cv2.VideoWriter_fourcc(*"mp4v")

for video_name in os.listdir(video_dir):
    if video_name.endswith(".mp4"):
        tag = video_name[:-4]

        with open(
            f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RStages-Ann/{tag}.mp4.json",
            "r",
        ) as file:
            data = json.load(file)

        cap = cv2.VideoCapture(
            f"/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/RTennisServes/{tag}.mp4"
        )

        # Sort the stages by the first frame in their frame range
        data["tags"].sort(key=lambda stage: stage["frameRange"][0])

        for stage in data["tags"]:
            start_frame, end_frame = stage["frameRange"]

            cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)

            # Create a folder for the stage if it doesn't exist
            folder_path = f'/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/{stage["name"]}'
            os.makedirs(folder_path, exist_ok=True)

            # Define the output video file
            out = cv2.VideoWriter(
                f'{folder_path}/{stage["name"]}_{tag}.mp4',
                fourcc,
                cap.get(cv2.CAP_PROP_FPS),
                (int(cap.get(3)), int(cap.get(4))),
            )

            for i in range(start_frame, end_frame + 1):
                ret, frame = cap.read()
                if not ret:
                    break

                # Write the frame to the output video file
                out.write(frame)

            # Release the VideoWriter for the current stage
            out.release()

        cap.release()
