'use strict';

var path = require('path');
var fs = require('fs');

module.exports.buildNavbar = function buildNavbarHtmlFile(navbar) {
  fs.writeFile(path.join(__dirname, '../', 'resources', 'html', 'navbar.html'), buildHtmlString(navbar), function(err) {
    if(err) {
        //error handling
    } else {
        //error handling
    }
  });
};

function buildHtmlString(navbar) {
  var htmlString = '<li id="home" class="active"><a onclick="navigateToRequestedID(\'index\')">Home</a></li>\n';

  for (var i = 0; i < navbar.length; i++) {
    htmlString += writeNavbarItem(navbar[i]);
  }
  htmlString += '<li id="contactMe"><a onclick="navigateToRequestedID(\'contactMe\')">Contact Me</a></li>';
  return htmlString;
}

function writeNavbarItem(item) {
  return '<li><a href="' + item.path + '">' + item.title + '</a></li>\n';
}