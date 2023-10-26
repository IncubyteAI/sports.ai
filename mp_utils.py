import numpy as np
from mediapipe.framework.formats import landmark_pb2
from mediapipe import solutions
from mediapipe.tasks.python.vision.pose_landmarker import PoseLandmarkerResult
def draw_landmarks_on_image(rgb_image: np.ndarray, detection_result: PoseLandmarkerResult) -> np.ndarray:
    """Draws landmarks from detection_result onto rgb_image.

    Args:
        rgb_image (np.ndarray): original image
        detection_result (PoseLandmarkerResult): result from detector.detect(rgb_image)

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
        landmark_pb2.NormalizedLandmark(x=landmark.x, y=landmark.y, z=landmark.z) for landmark in pose_landmarks
        ])
        solutions.drawing_utils.draw_landmarks(
        annotated_image,
        pose_landmarks_proto,
        solutions.pose.POSE_CONNECTIONS,
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