var express = require('express');
var router = express.Router();
var rp = require("request-promise");
var fs = require("fs");
var path = require("path")
// var md = require('markdown-it');
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('# markdown-it rulezz!');

// Multer
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

router.get('/', (req, res) => {
  res.render('index');
})


router.get('/test_flask', (req, res) => {
  rp("http://classifier/").then(api_response => {
    res.render('classification_results', {labels: api_response})
  })
});

router.get('/avatar', (req, res) => {
  res.render('avatar')
});

router.get('/classifier', (req, res) => {
  fs.readFile('views/docs/classifier.md', 'utf-8', (err, md_file) => {
    var md_result = md.render(md_file);
    res.render('upload', {md: md_result});
  });
  // res.render('upload', {md: md_result})
});

router.get('/md', (req, res) => {
  fs.readFile('views/docs/classifier.md', 'utf-8', (err, md_file) => {
    var md_result = md.render(md_file);
    res.render('mdtest', {md: md_result});
  });

  // res.send(md_result)
});

router.post('/classifier', upload.single('imgToClassify'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please choose files');
    error.httpStatusCode = 400
    return next(error)
  }
  var basename = path.basename(file.path)
  res.redirect('results/' + basename);
});

// Post an image to a flask sever, then return the labels.
router.get('/results/:img', (req, res) => {
  // let flask_server = 'http://localhost:5000'
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
  .then(api_response => {
    res.render('results', {
      labels: api_response,
      img_name: img_name,
      img_path: img_path,
    })
  })
  .catch(err => {
    console.log(err);
    if (err.name) {
      res.render('error')
    }
  });
});



module.exports = router;
