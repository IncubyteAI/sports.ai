import cv2
import mediapipe as mp
import time
import math

class PoseDetector:

    def __init__(self, mode=False, model_complexity=1, smooth=True, enable_seg=False, smooth_seg=True, detection_con=0.5, track_con=0.5):
        self.mode = mode
        self.modelComplexity = model_complexity
        self.smooth = smooth
        self.enableSeg = enable_seg
        self.smoothSeg = smooth_seg
        self.detectionCon = detection_con
        self.trackCon = track_con

        self.mpDraw = mp.solutions.drawing_utils
        self.mpPose = mp.solutions.pose
        self.pose = self.mpPose.Pose(self.mode, self.modelComplexity, self.smooth, self.enableSeg, self.smoothSeg, self.detectionCon, self.trackCon)

    def find_pose(self, img, draw=True):
        if img is None or len(img) == 0:
            return img
        imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(imgRGB)
        if self.results.pose_landmarks:
            if draw:
                self.mpDraw.draw_landmarks(img, self.results.pose_landmarks, self.mpPose.POSE_CONNECTIONS, landmark_drawing_spec=self.mpDraw.DrawingSpec(color=(0, 0, 255), thickness=3, circle_radius=2),
                                        connection_drawing_spec=self.mpDraw.DrawingSpec(color=(255, 255, 255), thickness=3))
        return img

    def find_position(self, img, draw=True):
        self.lm_list = []
        if self.results.pose_landmarks:
            for id, lm in enumerate(self.results.pose_landmarks.landmark):
                h, w, c = img.shape

                cx, cy = int(lm.x * w), int(lm.y * h)
                self.lm_list.append([id, cx, cy])
        return self.lm_list

    def find_angle(self, img, p1, p2, p3, c1, c2, c3, draw = True):
        x1, y1 = self.lm_list[p1][1:]
        x2, y2 = self.lm_list[p2][1:]
        x3, y3 = self.lm_list[p3][1:]

        angle = math.degrees(math.atan2(y3-y2, x3-x2) - math.atan2(y1-y2, x1-x2))

        if angle < 0:
            angle += 360

        if draw:
            cv2.line(img, (x1, y1), (x2,y2), (c1, c2, c3), 5)
            cv2.line(img, (x3, y3), (x2, y2), (c1, c2, c3), 5)
            cv2.circle(img, (x1, y1), 10, (c1, c2, c3), cv2.FILLED)
            cv2.circle(img, (x1, y1), 15, (c1, c2, c3), 2)
            cv2.circle(img, (x2, y2), 10, (c1, c2, c3), cv2.FILLED)
            cv2.circle(img, (x2, y2), 15, (c1, c2, c3), 2)
            cv2.circle(img, (x3, y3), 10, (c1, c2, c3), cv2.FILLED)
            cv2.circle(img, (x3, y3), 15, (c1, c2, c3), 2)
            cv2.putText(img, str(int(angle)), (x2+50, y2+50), cv2.FONT_HERSHEY_PLAIN, 2, (c1, c2, c3), 2)
        return angle
    def calculate_angle(self, p1, p2, p3):
        x1, y1 = self.lm_list[p1][1:]
        x2, y2 = self.lm_list[p2][1:]
        x3, y3 = self.lm_list[p3][1:]

        angle = math.degrees(math.atan2(y3-y2, x3-x2) - math.atan2(y1-y2, x1-x2))

        if angle < 0:
            angle += 360

        return angle
