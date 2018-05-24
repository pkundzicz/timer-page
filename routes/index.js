var express = require('express');
var router = express.Router();

var pairings = {
  "google": "search",
  "microsoft": "ascii",
  "pinterest": "nofilter",
  "adobe": "fishy",
  "snapchat": "radical",
  "airbnb": "amaze",
  "twitter": "newsy",
  "amazon": "cloud",
  "apple": "ipadplusprox",
  "facebook": "soviets",
  "yelp": "check",
  "tesla": "outlandish"
}

var ordering = {
  1: "google",
  2: "microsoft",
  3: "pinterest",
  4: "adobe",
  5: "snapchat",
  6: "airbnb",
  7: "twitter",
  8: "amazon",
  9: "apple",
  10: "facebook",
  11: "yelp",
  12: "tesla"
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST submit an answer. */
router.post('/submit', function(req, res) {
  console.log(req["body"]);
  var company = req["body"].company.replace(/ /g,'');
  var answer = req["body"].answer.replace(/ /g,'');
  if (company && company.toLowerCase() in pairings) {
    if (answer && answer.toLowerCase() == pairings[company.toLowerCase()]){
      res.send({company: company.toLowerCase(), answer: answer.toLowerCase()});
    } else {
      res.send({error: "true"});
    }
  } else {
    res.send({error: "true"});
  }
});

router.post('/order', function(req, res) {

})

module.exports = router;
