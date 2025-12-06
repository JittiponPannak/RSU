from flask import Flask, request
from flask_cors import CORS, cross_origin
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

@app.route('/')
def helloworld():
    return "helloworld"

@app.route('/area', methods = [ "GET" ])
def area():
    w = float(request.values["w"])
    h = float(request.values["h"])
    
    return str(w * h)

@app.route('/bmi', methods = [ "GET" ])
def bmi():
    w = float(request.values["w"])
    h = float(request.values["h"])
    
    return str(w / (h ** h))

@app.route('/iris', methods = ["POST", "GET"])
def predict_iris():
    model = joblib.load("C:\\Users\\nemoz\\Desktop\\University\\RSU\\RSU-CSC447\\iris.model")
    req = request.values.get("param")
    inputs = np.array(req.split(","), dtype=np.float32).reshape(1, -1)
    predict_target = model.predict(inputs)

    if predict_target == 0:
        return "Setosa"
    elif predict_target == 1:
        return "Versicolour"
    else:
        return "Virginica"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)