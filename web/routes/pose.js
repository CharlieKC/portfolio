var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path")
// var md = require('markdown-it');
var md = require('markdown-it')();


router.get('/', (req, res) => {
  fs.readFile('views/docs/pose.md', 'utf-8', (err, mdFile) => {
    if (err) { console.log(err) }
    var mdResult = md.render(mdFile)
    res.render('pose', { md: mdResult })
  })
})

router.get('/demo_image', (req, res) => {
  res.render('pose_image')
})

router.get('/demo_webcam', (req, res) => {
  res.render('pose_webcam')
})

router.get('/demo_sockets', (req, res) => {
  res.render('sockets')
})

module.exports = router;
