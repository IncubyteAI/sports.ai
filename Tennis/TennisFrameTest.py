import cv2
import PoseModule as pm

detector = pm.PoseDetector()

img = cv2.imread('/Users/tanayagrawal/PycharmProjects/sportsai/Tennis/RData/R1ar6/R1ar6_Stage 4_frame_92.png')

if img is None:
    print("no image")
else:
    img = detector.find_pose(img, True)
    lmList = detector.find_position(img, False)
    left_arm = detector.find_angle(img, 11, 13, 15, 255, 255, 255)
    right_arm = detector.find_angle(img, 12, 14, 16, 255, 255, 0)
    left_leg = detector.find_angle(img, 23, 25, 27, 0, 255, 255)
    right_leg = detector.find_angle(img, 24, 26, 28, 0, 255, 0)

    cv2.imshow('Image', img)
    cv2.waitKey(0)
    cv2.destroyAllWindows()