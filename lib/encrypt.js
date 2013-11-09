'use strict'

var sha1 = require('sha1');

module.exports = function(logindata){

  logindata.username = sha1(logindata.username);
  logindata.password = sha1(logindata.username+logindata.password);

  return logindata;
};