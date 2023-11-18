import os
import cv2
import csv
import PoseModule as pm

pose_detector = pm.PoseDetector()
limbs = {
    "left_arm": (11, 13, 15),
    "right_arm": (12, 14, 16),
    "left_leg": (23, 25, 27),
    "right_leg": (24, 26, 28),
}
dir_path = "/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData"

header = [
    "filename",
    "stage",
    "frame_index",
    "left_arm_angle",
    "right_arm_angle",
    "left_leg_angle",
    "right_leg_angle",
]
with open("dataset.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(header)

for folder in os.listdir(dir_path):
    if folder in ["RTennisServes", "RStages-Ann"] or not os.path.isdir(
        os.path.join(dir_path, folder)
    ):
        continue

    for image_file in os.listdir(os.path.join(dir_path, folder)):
        if os.path.isdir(os.path.join(dir_path, folder, image_file)):
            continue

        img = cv2.imread(os.path.join(dir_path, folder, image_file))
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        # pose_detection
        pose_detector.find_pose(img_rgb)
        pose_detector.find_position(img_rgb)
        angles = []
        for limb, indexes in limbs.items():
            if all(index < len(pose_detector.lm_list) for index in indexes):
                angle = pose_detector.calculate_angle(*indexes)
                angles.append(angle)
            else:
                angles.append(None)

        print(image_file)

        # extract
        file_parts = os.path.splitext(image_file)[0].split("_")
        print(file_parts)
        filename = file_parts[0]
        stage = file_parts[1]
        frame_index = file_parts[3]

        # dataset
        data_row = [filename, stage, frame_index] + angles
        with open("dataset.csv", "a", newline="") as f:
            writer = csv.writer(f)
            writer.writerow(data_row)
