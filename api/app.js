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

  var info = {
    title: '',
    images: [],
    price: '',
    error: false,
  }

  // Use Osmosis to get images and title from the url
  osmosis
  .get(req.body.link)
  .set({
      title: 'title',
      'images_src': ['img@src', 'img@data-src'],
  })
  .data((osmosisData) => {

    var scraperWorked = false;
    console.log("1. Osmosis worked");

    // Use scraper to get price
    scraper.init(req.body.link, (scraperData) => {
      scraperWorked = true;
      console.log("2. Scraper worked");

      // If scraper didn't extract price use request
      if (!scraperData.price) {
        console.log("Price not found!!!")

        request(req.body.link, (error, response, body) => {
          console.log("3. Request worked");

          // Get body of page
          var found = false;
          var $page = cheerio.load(body);
          text = $page("body").text();
          var textArr = [];
          if (text.indexOf('Access Denied') != -1) {
            console.log("4. Cheerio worked!")
            text = text.replace(/\s+/g, " ")
            textArr = text.split(" ")
          } else {
            console.log("Cheerio denied :(")
          }

          // Get title from either scraper or osmosis
          var title;
          if (scraperData.title) title = scraperData.title.split(" ");
          else title = osmosisData.title.split(" ");

          // Find price in body by looking for occurrence of '$'
          for (var i = 0; i < textArr.length; i++) {
            if (found && textArr[i].indexOf('$') !== -1) {
              console.log("Info price is " + textArr[i])
              info.price = textArr[i];
              break;
            } else if (textArr[i] == title[0] && textArr[i+1] == title[1]) {
              found = true;
            }
          }
        })
      } else {
        info.price = scraperData.price.replace("\n", '');
      }
    //  console.log("Sleeping")
      sleep(5000);
  //    console.log("Awakened")

      // Set the title
      info.title = scraperData.title || osmosisData.title;
      if (info.title == '') info.error = true;

      for (let i = 0; i < osmosisData.images_src.length; i++) {
        if (osmosisData.images_src[i].charAt(0) == '/' && osmosisData.images_src[i].charAt(1) != '/') {
          console.log(osmosisData.images_src[i]);
          var adr = req.body.link;
          var q = url.parse(adr, true);
          osmosisData.images_src[i] = q.protocol + "//" + q.host + osmosisData.images_src[i];
        } else if (osmosisData.images_src[i].charAt(0) == '/' && osmosisData.images_src[i].charAt(1) == '/') {
          osmosisData.images_src[i] = "https:" + osmosisData.images_src[i];
        }
        probe(osmosisData.images_src[i], (err, result) => {
          if (err) {
            console.log('');
          } else {
            if ((result.height > 200 && result.width > 100) && (result.type != 'gif')) {
              info.images.push(result.url)
            }
          }
        });
      }
      sleep(3000)
  //    console.log(info)
      res.send(JSON.stringify(info, null))
    });

    sleep(5000);
    if (!scraperWorked) {
      info.error = true;
      res.send(JSON.stringify(info, null));
    }
    sleep(1000);
    res.end();
  }).error(console.log)
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
        console.log(err);
      } else {
        if ((result.height > 200 && result.width > 100) && (result.type != 'gif')) {
          res.write(result.url + " ")
        }
      }
    });
  }
  sleep(3000)
  res.end()
})


app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
