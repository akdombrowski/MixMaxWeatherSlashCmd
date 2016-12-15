var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();

  handleSearchString(term, req, res);
};

function handleSearchString(term, req, res) {
  var response;
  try {
    response = sync.await(request({
      url: 'http://api.openweathermap.org/data/2.5/weather?' + 
        // city name
        'q=' + term +
        // imperial units
        '&units=imperial' +
        // return data in html format 
        '&mode=html' + 
        // api key
        '&appid=' + key,
      gzip: true,
      json: true,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  // returns html version of weather data
  res.json({
    body: response.body
    // Add raw:true if you're returning content that you want the user to be able to edit
  });
}
