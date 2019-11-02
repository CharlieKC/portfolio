from flask import Flask, flash, redirect, url_for, request, send_from_directory, abort
import time
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)


@app.route('/')
def hello():
    return 'This is the pose microservice!'



if __name__ == "__main__":
	app.run(host='0.0.0.0', port=80, debug=True)
