var express = require('express');
var router = express.Router();
const path = require('path')
const formidable = require('formidable')
const fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    imgSrc: 'uploads/TKB HK I 17-18.png',
    title: 'MainPage'
  })
});

router.post('/upload', function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.multiples = true;
  form.keepExtensions = true;
  form.uploadDir = path.join(__dirname, '/../public/uploads');
  form.parse(req)
  form.on('error', (err) => {
    console.log(err);
  })
  form.on('file', function (name, file) {
    console.log('URL:%s/%s', form.uploadDir, file.name);
    // fs.rename(file.path, path.join(form.uploadDir, file.name));
  });
  form.on('end', ()=>{
    console.log('END');
    res.render('index', {msg: 'Your files has been uploaded!'})
  })
});
module.exports = router;