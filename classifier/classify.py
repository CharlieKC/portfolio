import torch
from torchvision import transforms
from PIL import Image
import json

# Download model and put into eval mode
model = torch.hub.load('pytorch/vision', 'resnet101', pretrained=True)
# model = torch.load('models/resnet101-5d3b4d8f.pth', 'resnet101')
model.eval()

# preprocessing
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

class_idx = json.load(open("imagenet_class_index.json"))
idx2label = [class_idx[str(k)][1] for k in range(len(class_idx))]

def classify_image(filename, n=10):
    input_image = Image.open(filename)
    input_tensor = preprocess(input_image)
    input_batch = input_tensor.unsqueeze(0) # create a mini-batch as expected by the model

    # move the input and model to GPU for speed if available
    if torch.cuda.is_available():
        input_batch = input_batch.to('cuda')
        model.to('cuda')

    with torch.no_grad():
        output = model(input_batch)

    labels = []
    for idx in output[0].sort()[1][-n:]:
        labels.append(idx2label[idx])

    #Reverse order of labels to get the top predictions first
    return labels[::-1]
