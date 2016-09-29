var express = require('express');
var router = express.Router();
var fs = require("fs");
var contenu;

/* GET home page. */
contenu = fs.readFileSync("public/intro.txt", "UTF-8");
router.get('/', function(req, res, next) {
  res.render('index', {tab:contenu });
});

console.log(contenu);
module.exports = router;
