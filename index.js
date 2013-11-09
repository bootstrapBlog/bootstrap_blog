'use strict';

var fs = require('fs');
var initializeBlog = require('./lib/initialize');
<<<<<<< HEAD
var setupBlog = require('./lib/setup-blog');
var database = require('./lib/database');
=======
var webserver = require('./lib/webserver');
>>>>>>> master



module.exports.start = function(settings) {
  database.connect();

  if (fs.existsSync('./blog.config') === false) {
    console.log('no config file - initializing');
    initializeBlog(function(){
      webserver(settings);
    });
  } else {
<<<<<<< HEAD
    console.log('config found - starting blog');
    setupBlog(settings);
=======
    console.log('config found - starting blog')
    webserver(settings);
>>>>>>> master
  }
};
