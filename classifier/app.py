from flask import Flask, flash, redirect, url_for, request, send_from_directory, abort
import time
from werkzeug.utils import secure_filename
import os
import classify
import numpy as np

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 # 16 MB file limit

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def hello():
    return 'This is the classifier microservice!'

@app.route('/predict/', methods=['POST'])
def predict():
    labels = []
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

    labels = classify.classify_image(filepath)
    return str(labels)

@app.route('/classes/')
def class_list():
    arr = np.load('class_list.pickle', allow_pickle=True)
    return dict(arr)


if __name__ == "__main__":
	app.run(host='0.0.0.0', port=80, debug=True)
