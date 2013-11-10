'use strict';

var fs = require('fs');
var initializeBlog = require('./lib/initialize');
var Database = require('./lib/database');
var webserver = require('./lib/webserver');
var htmlBuilder = require('./lib/html-builder');

module.exports.start = function(settings, mailTransport) {
  htmlBuilder.buildNavbar(settings.navbar);

  if (fs.existsSync('./blog.config') === false) {
    console.log('no config file - initializing');
    initializeBlog(function(database){
      webserver(mailTransport, database);
    });
  } else {
    console.log('config found - starting blog');
    
    fs.readFile('./blog.config', 'utf8', function (err, data) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      var blogConfig = JSON.parse(data);
      var database = new Database(blogConfig.databaseUser, blogConfig.databasePassword, blogConfig.databaseUrl);
      webserver(mailTransport, database);
    });
  }
};
