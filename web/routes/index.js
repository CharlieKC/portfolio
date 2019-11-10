var express = require('express');
var router = express.Router();
var rp = require('request-promise');


router.get('/', (req, res) => {
  res.render('index');
})

router.get('/test', (req, res) => {
  rp('http://pose/video/climbing.mp4').then(vid =>{
    res.sendFile(vid)
  })
})


module.exports = router;
