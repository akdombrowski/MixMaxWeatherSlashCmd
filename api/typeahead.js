var key = require('../utils/key');
var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');


// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a city name)</i>',
      text: ''
    }]);
    return;
  } else {
    res.json([{
      title: 'city: ' + term,
      text: term
    }]);
    return;
  }
}

