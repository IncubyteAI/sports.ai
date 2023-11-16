import torch
import torch.nn as nn
from mp_utils import create_detector, BOTH_ARM_MARKERS, LEFT_HIP, RIGHT_HIP
from torchvision.io import read_video
import mediapipe as mp
class VideoProcessor:
    def __init__(self):
        self.detector = create_detector('pose_landmarker_lite.task')
        self.model = ClassificationNet()
        self.model.load()
    def get_frames(self, path):
        return read_video(path, pts_unit='sec')[0]
    def get_landmarks(self, path):
        video = read_video(path, pts_unit='sec')
        all_landmarks = []
        # video[0].shape -> (frames, height, width, channels)
        for frame in video[0]:
            mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame.numpy())
            detection_result = self.detector.detect(mp_image)
            if len(detection_result.pose_landmarks) < 1:
                all_landmarks.append([])
                continue
            pose_landmarks = detection_result.pose_landmarks[0]
            left_hip = pose_landmarks[LEFT_HIP]
            right_hip = pose_landmarks[RIGHT_HIP]
            center = (left_hip.x + right_hip.x) / 2, (left_hip.y + right_hip.y) / 2, (left_hip.z + right_hip.z) / 2
            translated_landmarks = []
            for j in BOTH_ARM_MARKERS:
                translated_landmarks.extend([
                    pose_landmarks[j].x - center[0], 
                    pose_landmarks[j].y - center[1], 
                    pose_landmarks[j].z - center[2], 
                ])
            all_landmarks.append(translated_landmarks)
        return all_landmarks
    def get_stages(self, all_landmarks):
        return self.model(torch.tensor(all_landmarks)).argmax(dim=1).tolist()
    def process(self, path):
        return self.get_frames(path), self.get_stages(self.get_landmarks(path))
class ClassificationNet(nn.Module):
    def __init__(self):
        super(ClassificationNet, self).__init__()
        self.net = nn.Sequential(
            nn.Linear(36, 50),
            nn.ReLU(),
            nn.Linear(50, 50),
            nn.ReLU(),
            # nn.Linear(50, 50),
            # nn.ReLU(),
            nn.Linear(50, 8)
        )

    def forward(self, x):
        return self.net(x)

    def load(self, path="model_state_dict.pt"):
        self.load_state_dict(torch.load(path))