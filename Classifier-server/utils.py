from PIL import Image
import numpy as np

def preprocess_image(image, target_size=(224, 224)):
    image = image.convert("RGB")
    image = image.resize(target_size)
    image = np.array(image) / 255.0  # Normalize
    image = np.expand_dims(image, axis=0)
    return image
