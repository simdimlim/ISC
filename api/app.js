var express = require('express');
var app = express();
var osmosis = require('osmosis');
var bodyParser = require('body-parser')
var probe = require('probe-image-size');
var url = require('url');
var sleep = require('system-sleep');
var request = require('request');
var cheerio = require('cheerio');
var scraper = require('product-scraper');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// POST method route
app.post('/scrape', function (req, res) {

  // Return data
    var info = {
      title: '',
      images: [],
      price: ''
    }
  // Use Osmosis to get images and title from the url
  osmosis
  .get(req.body.link)
  .set({
      title: 'title',
      'images_src': ['img@src', 'img@data-src'],
  })
  .data((osmosisData) => {

    console.log("1. Osmosis worked");

    request(req.body.link, (error, response, body) => {
      console.log("2. Request worked");

      if (error) {
        console.log("error is " + error)
      }

      // Get body of page
      var found = false;
      var $page = cheerio.load(body);
      text = $page("body").text();
      var textArr = [];
      text = text.replace(/\s+/g, " ")
      textArr = text.split(" ")

      // Find price in body by looking for occurrence of '$'
      if (osmosisData.title) {
        console.log("Have found title -> " + osmosisData.title)
        var title = osmosisData.title.split(" ");
        if (title.length != 0) {
          console.log("Lookin for price")
          for (var i = 0; i < textArr.length; i++) {
            if (found && textArr[i].indexOf('$') !== -1 && !textArr[i].match(/[^0-9$.]/i)) {
              console.log("Info price is " + textArr[i])
              info.price = textArr[i];
              console.log(textArr[i])
              break;
            } else if (title.indexOf(textArr[i]) !== -1 && title.indexOf(textArr[i+1]) !== -1) {
              found = true;
            }
          }
        }
      }

      // Set the title and images
      info.title = osmosisData.title || '';
      info.images = osmosisData.images_src;

      res.send(JSON.stringify(info, null))

    })
  }).error(console.log);
})



app.post('/filter', function(req, res) {
  console.log('using filter........');
  var largestHeight = 0;
  var largestWidth = 0;
  var largestImg = '';
  res.setHeader('Content-Type', 'text/html');
  for (let i = 0; i < req.body.data.length; i++) {
    if (req.body.data[i].charAt(0) == '/' && req.body.data[i].charAt(1) != '/') {
      console.log(req.body.data[i])
      var adr = req.body.link;
      var q = url.parse(adr, true);
      req.body.data[i] = q.protocol + "//" + q.host + req.body.data[i];
    } else if (req.body.data[i].charAt(0) == '/' && req.body.data[i].charAt(1) == '/') {
      req.body.data[i] = "https:" + req.body.data[i];
    }
    probe(req.body.data[i], (err, result) => {
      if (err) {
        console.log('');
      } else {
        if ((result.height > 200 && result.width > 100) && (result.type != 'gif')
          && ((2*result.width) > result.height) && ((2*result.height) > result.width)) {
          res.write(result.url + " ")
        }
      }
    });
  }
  sleep(5000)
  res.end()
})


app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
