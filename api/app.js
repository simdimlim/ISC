var express = require('express');
var app = express();
var osmosis = require('osmosis');
var bodyParser = require('body-parser')

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
    osmosis
    .get(req.body.link)
    .set({
        title: 'title',
        p: '.price',
        'images_src': ['img@src'],
        'images_datasrc': ['img@data-src']
    })
    .data(function(data) {
        res.send(data);
    })
})


app.listen(3000, () => {
  console.log('app listening on port 3000!');
});
