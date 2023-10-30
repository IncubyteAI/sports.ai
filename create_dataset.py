import os
from torchvision.io import read_video
from mp_utils import create_detector, draw_landmarks_on_image
import mediapipe as mp
import random
import matplotlib.pyplot as plt
# CLASSES = ['Stage1', 'Stage2', 'Stage3', 'Stage4', 'Stage5', 'Stage6', 'Stage7', 'Stage8']
CLASSES = ['Stage1']
detector = create_detector()
plotted = 0
for i, clas in enumerate(CLASSES):
    for file in os.listdir(os.path.join("RData", clas)):
        if file.split(".")[-1] == "mp4":
            print("Processing: ", file)
            video = read_video(os.path.join("RData", clas, file), pts_unit='sec')
            # video[0].shape -> (frames, height, width, channels)
            for frame in video[0]:
                mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=frame.numpy())
                detection_result = detector.detect(mp_image)
                if  plotted < 5 and random.randint(0, 999) == 0:
                    plotted += 1
                    annotated_image = draw_landmarks_on_image(frame.numpy(), detection_result)
                    plt.subplot(1, 5, plotted)
                    plt.imshow(annotated_image)
                    plt.title(clas)
plt.show()
