let img // Declare variable 'img'.
const points = [[100, 100], [100, 400], [400, 400], [400, 100], [100, 100]]
function setup() {
  img = loadImage('images/woman.jpg', (img) => {
    createCanvas(img.width, img.height)
  }) // Load the image
}




function draw () {
  image(img, 0, 0)
  circle(30, 30, 20)
  strokeWeight(5)
  line(100, 100, 200, 400)
  stroke(255)
  drawPoints(points)
}

function drawPoints (points) {
  for (var i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length
    circle(points[i][0], points[i][1], 25)
    strokeWeight(3)
    line(points[i][0], points[i][1], points[j][0], points[j][1])
  }
}
