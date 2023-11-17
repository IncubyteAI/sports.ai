import numpy as np
from mediapipe.framework.formats import landmark_pb2
from mediapipe.python import solutions
from mediapipe.tasks.python.vision.pose_landmarker import PoseLandmarkerResult
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from typing import List
import os
def create_detector(model_path: str = 'pose_landmarker_heavy.task') -> vision.PoseLandmarker:
    assert(os.listdir().count(model_path) == 1)
    base_options = python.BaseOptions(model_asset_path=model_path)
    options = vision.PoseLandmarkerOptions(
        base_options=base_options,
        output_segmentation_masks=False
    )
    return vision.PoseLandmarker.create_from_options(options)
RIGHT_ARM_MARKERS = [12, 14, 16, 18, 20, 22]
LEFT_ARM_MARKERS = [x - 1 for x in RIGHT_ARM_MARKERS]
BOTH_ARM_MARKERS = RIGHT_ARM_MARKERS + LEFT_ARM_MARKERS
LEFT_HIP = 23
RIGHT_HIP = 24
def draw_landmarks_on_image(rgb_image: np.ndarray, detection_result: PoseLandmarkerResult, markers: List[int] = range(33)) -> np.ndarray:
    """Draws landmarks from detection_result onto rgb_image.

    Args:
        rgb_image (np.ndarray): original image
        detection_result (PoseLandmarkerResult): result from detector.detect(rgb_image)
        markers (list[int], optional): list of landmark indices to draw. Defaults to range(33), i.e. all landmarks

    Returns:
        np.ndarray: annotated image
    """
    pose_landmarks_list = detection_result.pose_landmarks
    annotated_image = np.copy(rgb_image)

    # Loop through the detected poses to visualize.
    for idx in range(len(pose_landmarks_list)):
        pose_landmarks = pose_landmarks_list[idx]

        # Draw the pose landmarks.
        pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        pose_landmarks_proto.landmark.extend([
        landmark_pb2.NormalizedLandmark(x=pose_landmarks[i].x, y=pose_landmarks[i].y, z=pose_landmarks[i].z) for i in markers
        ])
        solutions.drawing_utils.draw_landmarks(
            annotated_image,
            pose_landmarks_proto,
            solutions.pose.POSE_CONNECTIONS if markers == range(33) else None,
        )
    return annotated_image
def plot_landmarks(detection_result: PoseLandmarkerResult) -> None:
    """Plot landmarks in 3d.

    Args:
        detection_result (PoseLandmarkerResult): return from detector.detect()
    """
    pose_landmarks_list = detection_result.pose_landmarks
    # Loop through the detected poses to visualize.
    for idx in range(len(pose_landmarks_list)):
        pose_landmarks = pose_landmarks_list[idx]
        # Draw the pose landmarks.
        pose_landmarks_proto = landmark_pb2.NormalizedLandmarkList()
        pose_landmarks_proto.landmark.extend([
        landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in pose_landmarks
        ])
        solutions.drawing_utils.plot_landmarks(
        pose_landmarks_proto,
        solutions.pose.POSE_CONNECTIONS,
        # solutions.drawing_styles.get_default_pose_landmarks_style()
        )