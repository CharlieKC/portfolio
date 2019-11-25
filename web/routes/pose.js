var express = require('express');
var router = express.Router();
var fs = require("fs");
var path = require("path")
// var md = require('markdown-it');
var md = require('markdown-it')();


router.get('/', (req, res) => {
  fs.readFile('views/docs/pose.md', 'utf-8', (err, md_file) => {
    var md_result = md.render(md_file);
    res.render('pose', {md: md_result});
  });
});

router.get('/demo_simple', (req, res) => {
  res.render('pose_demo');
});



module.exports = router;
