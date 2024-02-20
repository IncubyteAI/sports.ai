from flask import Flask, request
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
from model_training.video import VideoProcessor
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
auth = HTTPBasicAuth()
processor = VideoProcessor()

users = {
    "tanay": generate_password_hash("YanatPlayz"),
    "daniel": generate_password_hash("shsh")
}

@auth.verify_password
def verify_password(username, password):
    if username in users and \
            check_password_hash(users.get(username), password):
        return username
    
@app.route('/')
@auth.login_required
def index():
    return "Hello, {}!".format(auth.current_user())

@app.route('/predict', methods=['POST'])
def predict():
    print('Received request')
    file = request.files['file']
    file.save('temp.mp4')

    frames, stages = processor.process('temp.mp4')
    frames = frames.tolist()
    response = {'frames': frames, 'stages': stages}
    print('Sending response')
    return json.dumps(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)