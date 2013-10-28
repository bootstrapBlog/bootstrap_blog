'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

module.exports.start = function(settings) {
  buildNavbarHtmlFile(settings.navbar);
  app.set('view options', {layout: false});
  app.configure(function() {
    app.use(express.static(path.join(__dirname, 'resources', 'html')));
    app.use(express.static(path.join(__dirname, 'resources')));
  });

  app.get('/', function(req, res) {
      res.render('index.html');
  });

  app.listen(8080);

};

function buildNavbarHtmlFile(navbar) {
  fs.writeFile(path.join(__dirname, 'resources', 'html', 'navbar.html'), buildHtmlString(navbar), function(err) {
    if(err) {
        //error handling
    } else {
        //error handling
    }
  });
}

function buildHtmlString(navbar) {
  var htmlString = '<li class="active"><a href="#">Home</a></li>\n';

  for (var i = 0; i < navbar.length; i++) {
    htmlString += getEachNavbarItem(navbar[i]);
  }
  return htmlString;
}

function getEachNavbarItem(item) {
  return '<li><a href="' + item.path + '">' + item.title + '</a></li>\n';
}