import gradio as gr
from model_training.model import VideoProcessor
import torch
from pose.mp_utils import draw_landmarks_on_image
import mediapipe as mp
vp = VideoProcessor()
def fn(img):
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img)
    return draw_landmarks_on_image(img, vp.detector.detect(mp_image)), "Stage " + str(vp.get_stage(vp.landmark(torch.tensor(img))) + 1)
demo = gr.Interface(fn, gr.Image(), ["image", "text"])
demo.launch()