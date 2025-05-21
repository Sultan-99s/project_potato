from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import io
import numpy as np
from utils import preprocess_image

# Flask setup
app = Flask(__name__)
CORS(app)

# Load the model
model = tf.keras.models.load_model("best_model.h5")

# Class labels (order must match model's training)
CLASS_NAMES = [
    "Bacteria", "Fungi", "Healthy", "Nematode", "Pest", "Phytophthora", "Virus"
]

@app.route("/predict", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    image = Image.open(io.BytesIO(file.read()))
    processed = preprocess_image(image)

    predictions = model.predict(processed)[0]
    confidence = float(max(predictions))
    predicted_index = int(predictions.argmax())
    predicted_class = CLASS_NAMES[predicted_index]

    return jsonify({
        "class": predicted_class,
        "confidence": round(confidence, 4)
    })

if __name__ == "__main__":
    app.run(debug=True)
