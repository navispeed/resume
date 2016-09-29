var express = require('express');
var router = express.Router();
var os = require("os");
var fs = require("fs");
var contenu;

/* GET home page. */
contenu = fs.readFileSync("public/intro.txt", "UTF-8");
router.get('/', function(req, res, next) {
  res.render('index', {tab:contenu });
});

console.log(os.hostname());
module.exports = router;
