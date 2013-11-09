'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');

var htmlBuilder = require('./html-builder');

module.exports = function setupBlog(settings){
  
  var app = express();

  var config = JSON.parse(fs.readFileSync('./blog.config'));
  htmlBuilder.buildNavbar(settings.navbar);
  app.set('view options', {layout: false});
  app.configure(function() {
    app.use(express.static(path.join(__dirname, '../', 'resources', 'html')));
    app.use(express.static(path.join(__dirname, '../', 'resources')));
    app.use(express.bodyParser());
  });

  app.get('/', function(req, res) {
      res.render('index.html');
  });

app.post('/contactMe/new', function(request, response){
  response.send(request.body);
});

  app.listen(config.blogPort);
  console.log('Blog is running on port ' + config.blogPort);

};

