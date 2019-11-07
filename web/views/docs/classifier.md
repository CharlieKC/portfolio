## Image classifier

At the bottom of this page is a demo for an image classifier.

This page makes use of:
- node.js
  - Handling uploading the form via multer.
- flask (microservice)
  - Image classification api
  - resnet101, trained on ImageNet using the PyTorch for inferencing the model.


### Step 1. Upload an image.
When you upload an image into the form the image is uploaded as a `enctype="multipart-/form-data"`

### Step 2. Image is received by node.js server.

Multer is a node.js middleware for handling `multipar/form-data`, this is the HTML form type primarily used for uploading files.

### Step 3. Node sends image to flask sever for classification.
Node posts the image to a flask end point. Flask is running as a service as a seperate Docker container, this docker container can interact to the node.js container via specified ports. When the Flask sever receives the image it is resized and passed into a ImageNet trained resnet-101 allowing for the image to be classified into one of 1000 classes.

### Step 4. Node receives classification results and displays results page.
As the flask server transforming the image and inferencing the model takes a small amount of time results are not immediately available the node sever has to wait for the flask sever to give results. Once the node sever receives the results from the `http://classifier/predict` end point a results page is rendered


### Improvements:

- Newer ML models could be used.
- Inputs could be more thoroughly validated.
- Images could be directly uploaded to web storage such as S3, then the Flask sever could work on the S3 image, rather than having the image go through the node server.

## Demo:
[Classes list](/classifier/classes)

Upload a `.jpg` to be classified.
