import tensorflow as tf

model = tf.keras.models.load_model("model.h5")
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.experimental_new_converter = True
tflite_model = converter.convert()
file = open("converted_model.tflite", "wb")
file.write(tflite_model)
