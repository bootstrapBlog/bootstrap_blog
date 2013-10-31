'use strict';

var fs = require('fs');
var initializeBlog = require('./lib/initialize');
var webserver = require('./lib/webserver');



module.exports.start = function(settings) {
  if (fs.existsSync('./blog.config') === false) {
    console.log('no config file - initializing')
    initializeBlog(function(){
      webserver(settings);
    });
  } else {
    console.log('config found - starting blog')
    webserver(settings);
  }
};
