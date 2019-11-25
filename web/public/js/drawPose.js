let img // Declare variable 'img'.
var poseResult
var flipHorizontal = false

var imageElement = document.getElementById('loadedImage');

var getPose = new Promise(function (resolve, reject) {
  posenet.load().then(function (net) {
    const pose = net.estimateSinglePose(imageElement, {
      flipHorizontal: false
    })
    resolve(pose)
  })
})



function setup() {
  img = loadImage('../images/man.jpg', (img) => {
    createCanvas(img.width, img.height)
  }) // Load the image
}

function draw () {
  image(img, 0, 0)
  getPose.then(drawPoints).then(noLoop)
}

// Draw each keypoint
function drawPoints (points) {
  let keypoints = points.keypoints
  for (let i = 0; i < keypoints.length; i++) {
    let pos = keypoints[i].position
    if (pos.x > 0 && pos.y > 0) {
      console.log(pos.x)
      console.log(pos.y)
      circle(pos.x, pos.y, 10)
    }
  }
}
