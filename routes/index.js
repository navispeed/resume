var express = require('express');
var router = express.Router();
var os = require("os");
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
  var content;
  content = fs.readFileSync("public/intro.txt", "UTF-8");
  var link = "";
  cv = "http://cv.yohanncelerien.com";
  switch (req.headers.host) {
    case "navispeed.eu":
      link = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ \
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), \
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) \
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); \
      ga('create', 'UA-85689868-1', 'auto'); \
      ga('send', 'pageview'); \
    ";
      cv = "http://cv.navispeed.eu";
      break;
    case "yohanncelerien.com":
      link = "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){  \
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),        \
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)       \
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');    \
      ga('create', 'UA-85942631-1', 'auto');                                                \
            ga('send', 'pageview');";
      cv = "http://cv.yohanncelerien.com";
      break;
  }
  res.render('index', {tab:content, analytics: link, cv:cv });
});

router.get('/who', function(req, res, next) {
  var content;
  console.log("h:", req.headers.host);
  res.setHeader('Content-Type', 'application/json');

  switch (req.headers.host) {
    case "127.0.0.1:3000":
      content = fs.readFileSync("public/profils/yohann.json", "UTF-8");
      break;
    case "navispeed.eu":
      content = fs.readFileSync("public/profils/greg.json", "UTF-8");
      break;
    case "yohanncelerien.com:443":
      content = fs.readFileSync("public/profils/yohann.json", "UTF-8");
      break;
    default:
      content = "{ \"status\": \"not found\", \"host\": " + req.headers.host + " }";
  }

  res.send(content);
});

router.get('/who/skills', function(req, res, next) {
  var content;
  console.log("h:", req.headers.host);
  switch (req.headers.host) {
    case "127.0.0.1:3000":
      content = fs.readFileSync("public/profils/yohann.skills", "UTF-8");
      break;
    case "navispeed.eu":
      content = fs.readFileSync("public/profils/greg.skills", "UTF-8");
      break;
    case "yohanncelerien.com:443":
      content = fs.readFileSync("public/profils/yohann.skills", "UTF-8");
      break;
    default:
      content = "{ \"status\": \"not found\", \"host\": " + req.headers.host + " }";
  }
  res.send(content);
});

router.get('/who/picture', function(req, res, next) {
  var content;
  console.log("h:", req.headers.host);

  switch (req.headers.host) {
    case "127.0.0.1:3000":
      content = fs.readFileSync("public/profils/greg.ascii", "UTF-8");
      break;
    case "navispeed.eu":
      content = fs.readFileSync("public/profils/greg.ascii", "UTF-8");
      break;
    case "yohanncelerien.com:443":
      content = fs.readFileSync("public/profils/yohann.ascii", "UTF-8");
      break;
    default:
      content = "{ \"status\": \"not found\", \"host\": " + req.headers.host + " }";
  }
  res.send(content);
});

router.get('/who/experience', function(req, res, next) {
  var content;
  console.log("h:", req.headers.host);
  res.setHeader('Content-Type', 'application/json');

  switch (req.headers.host) {
    case "127.0.0.1:3000":
      content = fs.readFileSync("public/profils/greg.experience", "UTF-8");
      break;
    case "navispeed.eu":
      content = fs.readFileSync("public/profils/greg.experience", "UTF-8");
      break;
    case "yohanncelerien.com:443":
      content = fs.readFileSync("public/profils/yohann.experience", "UTF-8");
      break;
    default:
      content = "{ \"status\": \"not found\", \"host\": " + req.headers.host + " }";
  }
  res.send(content);
});

router.get("/linux", function (req, res, next) {
    var img = fs.readFileSync('public/images/linux_console.JPG');
    res.writeHead(200, {'Content-Type': 'image/gif' });
    res.end(img, 'binary');
});

router.get("/who/cv", function (req,res, next) {
    var pdf;
    switch (req.headers.host) {
        case "127.0.0.1:3000":
            pdf = fs.readFileSync("public/pdf/greg.pdf");
            break;
        case "navispeed.eu":
            pdf = fs.readFileSync("public/pdf/greg.pdf");
            break;
        case "yohanncelerien.com:443":
            pdf = fs.readFileSync("public/pdf/yohann.pdf");
            break;
        default:
            pdf = "{ \"status\": \"not found\", \"host\": " + req.headers.host + " }";
    }
    res.writeHead(200, {'Content-Type': 'application/pdf' });
    res.end(pdf, 'binary');
});

//console.log(request.headers.host);
module.exports = router;
