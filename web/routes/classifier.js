var express = require('express');
var router = express.Router();
var rp = require("request-promise");
var fs = require("fs");
var path = require("path")
// var md = require('markdown-it');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads')
  },
  filename: function (req, file, cb) {
    let file_ext = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + Date.now() + '.' + file_ext);
  }
})

var upload = multer({ storage: storage })


// GET '/', show the classifier explaination and demo
router.get('/', (req, res) => {
  fs.readFile('views/docs/classifier.md', 'utf-8', (err, md_file) => {
    var md_result = md.render(md_file);
    res.render('upload', {md: md_result});
  });
});

// POST handle input file from form, send to results page
router.post('/', upload.single('imgToClassify'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400
    return next(error)
  }
  var basename = path.basename(file.path)
  res.redirect('/classifier/results/' + basename);
});

// Results page, also gets results from flask sever
router.get('/results/:img', (req, res) => {
  let img_name = req.params.img;
  let img_path = '/uploads/' + img_name;
  var options = {
    method: 'POST',
    uri: 'http://classifier/predict/',
    formData: {
      name: 'file',
      file: {
        value: fs.createReadStream('public/' + img_path),
        options: {
          filename: img_name,
          contentType: 'image/jpg'
        }
      }
    },
  };
  rp(options)
    .then(apiResponse => {
      res.render('results', {
        labels: apiResponse,
        img_name: img_name,
        img_path: img_path
      })
    })
    .catch(err => {
      console.log(err)
      if (err.name) {
        res.render(err)
      }
    })
})

router.get('/classes', (req, res) => {
  rp('http://classifier/classes').then(arr => {
    res.send(arr)
  });
})


module.exports = router;
