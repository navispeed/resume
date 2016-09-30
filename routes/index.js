var express = require('express');
var router = express.Router();
var os = require("os");
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  var content;
  content = fs.readFileSync("public/intro.txt", "UTF-8");
  res.render('index', {tab:content });
});

router.get('/who', function(req, res, next) {
  var content;
  res.setHeader('Content-Type', 'application/json');

  switch (req.headers.host) {
    case "127.0.0.1:3000":
      content = fs.readFileSync("public/profils/greg.json", "UTF-8");
      break;
    case "navispeed.eu:3000":
      content = fs.readFileSync("public/profils/greg.json", "UTF-8");
      break;
    case "yohanncelerien.com:3000":
      content = fs.readFileSync("public/profils/yohann.json", "UTF-8");
      break;
    default:
      content = "{ \"status\": \"not found\", \"host\": " + req.headers.host + " }";
  }

  res.send(content);
});

//console.log(request.headers.host);
module.exports = router;
