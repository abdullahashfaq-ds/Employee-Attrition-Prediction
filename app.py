import pickle
import pandas as pd
from flask import Flask, request, jsonify, render_template


with open('./models/LogisticRegression.pkl', 'rb') as model_file:
    model = pickle.load(model_file)


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.json
        data = pd.DataFrame([input_data])
        prediction = model.predict(data)
        result = {'prediction': int(prediction[0])}
        return jsonify(result), 200

    except Exception as e:
        error_message = {'error': str(e)}
        return jsonify(error_message), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
