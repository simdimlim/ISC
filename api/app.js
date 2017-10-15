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

// GET method route
app.get('/hey', function (req, res) {
    osmosis
    .get('http://www.asos.com/au/asos/asos-solo-strap-pouch-shopper-bag/prd/8481803?clr=black&cid=8730&pgesize=36&pge=0&totalstyles=834&gridsize=3&gridrow=7&gridcolumn=1')
    .set({
        'images_src': ['img@src'],
        'images_datasrc': ['img@data-src']
    })
    .find('span')
    .set({
      'title':        'section > h2',
      'description':  '#price',
      'subcategory':  'div.breadbox > span[4]',
      'date':         'time@datetime',
      'latitude':     '#map@data-latitude',
      'longitude':    '#map@data-longitude',
      'images':       ['img@src']
    })
    .data(function(data) {
        res.send(data);
    })
})

// POST method route
app.post('/scrape', function (req, res) {
    scraper.init(req.body.link, (scraperData) => {
      osmosis
        .get(req.body.link)
        .set({
            title: 'title',
            'images_src': ['img@src', 'img@data-src'],
        })
        .data((osmosisData) => {
          request(req.body.link, (error, response, body) => {
            var found = false
            var $page = cheerio.load(body),
            text = $page("body").text();
            text = text.replace(/\s+/g, " ")
            var textArr = text.split(" ")

            var title;
            var info = {
              title: '',
              images: [],
              price: '',
              needFilter: false
            }

            // Get title
            if (scraperData.title) {
              title = scraperData.title.split(" ");
              info.title = scraperData.title;
            } else {
              title = osmosisData.title.split(" ");
              info.title = osmosisData.title;
              info.needFilter = true;
            }

            // Get array of images
            if (scraperData.images.length != 0) {
              for (var i = 0; i < scraperData.images.length; i++) {
                if (info.images.indexOf(scraperData.images[i].src) == -1) {
                  info.images.push(scraperData.images[i].src);
                }
              }
            } else {
              info.images = osmosisData.images_src;
            }

            for (var i = 0; i < textArr.length; i++) {
              if (found && textArr[i].indexOf('$') !== -1) {
                console.log("..... " + textArr[i]);
                info.price = textArr[i];
                break;
              }
              else if (textArr[i] == title[0] && textArr[i+1] == title[1]) {
                found = true;
              }
            }
            console.log(info)
            res.send(JSON.stringify(info, null))
          })
        }).error(console.log)
    });

    // scraper.init(req.body.link, function(data) {
    //   console.log(data)
    //   if (data.images == []) {
    //     osmosis
    //     .get(req.body.link)
    //     .set({
    //         title: 'title',
    //         'images_src': ['img@src', 'img@data-src'],
    //     })
    //     .data(function(data) {
    //       res.send(data);
    //     }).error(console.log)
    //   }
    //   res.send(JSON.stringify(data, null))
    // });
    // osmosis
    // .get(req.body.link)
    // .set({
    //     title: 'title',
    //     'images_src': ['img@src', 'img@data-src'],
    // })
    // .data(function(data) {
    //   res.send(data);
    // }).error(console.log)
})



app.post('/filter', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  for (let i = 0; i < req.body.data.length; i++) {
    if (req.body.data[i].charAt(0) == '/' && req.body.data[i].charAt(1) != '/') {
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
        if ((result.height > 200 && result.width > 100) && (result.type == 'jpg' || result.type == 'png' || result.type == 'jpeg')) {
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
