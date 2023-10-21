from flask import Flask, request, jsonify
from flask_cors import CORS

# import ML flask

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route("/")
def home():
    return {"message": "Hello from backend"}


if __name__ == '__main__':
    app.run(debug=True)
