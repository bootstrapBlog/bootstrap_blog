'use strict'

var sha1 = require('sha1');

module.exports = function(logindata){
  logindata = {
    username: 'd-schwarz89@ascension.de',
    password: 'critical89'
  };
  logindata.username = sha1(logindata.username);
  logindata.password = sha1(logindata.username+logindata.password);

  console.log(logindata.username.length);
}();