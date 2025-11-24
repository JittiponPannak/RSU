from PIL import Image
from keras.models import load_model
from flask import Flask, request
from flask_cors import CORS, cross_origin
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

class_names = [
    "airplane",
    "automobile",
    "bird",
    "cat",
    "deer",
    "dog",
    "frog",
    "horse",
    "ship",
    "truck"
    ]
model = load_model("final_model.keras")

@app.route('/cifar10', methods = ["POST"])
def cifar10():
    image_upload = request.files["image"]
    img = Image.open(image_upload).resize((32, 32))
    img = np.array(img)
    img = img.reshape(1, 32, 32, 3)
    img = img.astype("float32")
    img = img / 255
    output = model.predict(img)
    np.argmax(output)

    return class_names[int(np.argmax(output))]

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)