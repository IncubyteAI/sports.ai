"""Contains the VideoProcessor class, which is used to process videos."""

import torch
import torch.nn as nn
from torchvision.io import read_video
import mediapipe as mp
from pose.mp_utils import *
from models.models import CN_S200_5_D25
from typing import List, Tuple


class VideoProcessor:
    """Class used to process videos."""

    def __init__(self):
        self.detector = create_detector("pose_landmarker_lite.task")
        self.model = CN_S200_5_D25()
        self.model.load()
    
    def get_frames(self, path: str) -> torch.Tensor:
        """Gets the frames of a video at a given path.

        Args:
            path (str): path to video

        Returns:
            torch.Tensor: tensor of shape (frames, height, width, channels)
        """
        return read_video(path, pts_unit="sec")[0]

    def landmark(self, frame: torch.Tensor) -> List[int]:
        """Extracts the landmarks from a single frame.

        Args:
            frame (torch.Tensor): a single frame of a video of shape (height, width, channels)

        Returns:
            List[int]: locations of the landmarks (x, y, and z for each)
        """
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame.numpy())
        detection_result = self.detector.detect(mp_image)
        if len(detection_result.pose_landmarks) < 1:
            return []
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
        return translated_landmarks

    def get_landmarks(self, path: str) -> List[List[int]]:
        """Gets the landmarks for each frame of a video.

        Args:
            path (str): path to video

        Returns:
            List[List[int]]: list of landmarks for each frame
        """
        video = read_video(path, pts_unit="sec")
        all_landmarks = []
        # video[0].shape -> (frames, height, width, channels)
        for frame in video[0]:
            all_landmarks.append(self.landmark(frame))
        return all_landmarks

    def get_stage(self, landmarks: List[int]) -> int:
        """Gets the stage of the pose from the landmarks.

        Args:
            landmarks (List[int]): List of landmarks of a given pose

        Returns:
            int: stage of the pose
        """
        return self.model(torch.tensor(landmarks)).argmax().item()

    def get_stages(self, all_landmarks: List[List[int]]) -> List[int]:
        """Gets the stages of all frames of a video from its landmarks.

        Args:
            all_landmarks (List[List[int]]): list of landmarks for each frame of a video

        Returns:
            List[int]: list of stages for each frame of a video
        """
        return self.model(torch.tensor(all_landmarks)).argmax(dim=1).tolist()

    def process(self, path: str) -> Tuple[torch.Tensor, List[int]]:
        """Gets the frames and stages of a video from its path.

        Args:
            path (str): path to video

        Returns:
            Tuple[torch.Tensor, List[int]]: tuple of frames (Tensor with shape (frames, height, width, channels)) and stages of each frame
        """
        return self.get_frames(path), self.get_stages(self.get_landmarks(path))
