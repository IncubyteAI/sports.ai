"""A gradio demo for the pose classifier."""

import gradio as gr
from model_training.video import VideoProcessor
import torch
from pose.mp_utils import draw_landmarks_on_image
import mediapipe as mp
import numpy as np

vp = VideoProcessor()


def fn(img: np.ndarray):
    """Inputs an image and outputs the image with landmarks drawn on it and the stage of the pose.

    Args:
        img (np.ndarray): an image to classify

    Returns:
        (np.ndarray, str): an np array of the annotated image and the stage of the pose ("Stage x")
    """
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=img)
    return draw_landmarks_on_image(img, vp.detector.detect(mp_image)), "Stage " + str(
        vp.get_stage(vp.landmark(torch.tensor(img))) + 1
    )


demo = gr.Interface(fn, gr.Image(), ["image", "text"])
demo.launch()
