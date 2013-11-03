'use strict';

var fs = require('fs');
var initializeBlog = require('./lib/initialize');
var setupBlog = require('./lib/setup-blog');
var database = require('./lib/database');



module.exports.start = function(settings) {
  database.connect();

  if (fs.existsSync('./blog.config') === false) {
    console.log('no config file - initializing');
    initializeBlog(function(){
      setupBlog(settings);
    });
  } else {
    console.log('config found - starting blog');
    setupBlog(settings);
  }
};
