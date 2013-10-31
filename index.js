'use strict';

var fs = require('fs');
var initializeBlog = require('./initialize.js');
var setupBlog = require('./lib/setup-blog');



module.exports.start = function(settings) {
  if (fs.existsSync('./blog.config') === false) {
    console.log('no config file - initializing')
    initializeBlog(function(){
      setupBlog(settings);
    });
  } else {
    console.log('config found - starting blog')
    setupBlog(settings);
  };
}
