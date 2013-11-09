'use strict';

var readline = require('readline');
var async = require('async');
var fs = require('fs');

var Database = require('./database');

module.exports = function(cb){

  var database;
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var config = {};

  async.series([
    function(callback) {
      rl.question('Which port do you want the blog to listen on? ', function(port){
        config.blogPort = port;
        callback(null);
      });
    },
    function(callback){
      rl.question('What is the url of your database? ', function(url){
        config.databaseUrl = url;
        callback(null);
      });
    },
    function(callback){
      rl.question('What is the user of your database? ', function(databseUser){
        config.databaseUser = databseUser;
        callback(null);
      });
    },
    function(callback){
      rl.question('What is the password of your database? ', function(databasePassword){
        config.databasePassword = databasePassword;
        callback(null);
      });
    },
    function(callback){
      rl.question('Admin username for your blog: ', function(blogUser){
        config.username = blogUser;
        callback(null);
      });
    },
    function(callback){
      rl.question('Admin password for your blog: ', function(blogPassword){
        config.password = blogPassword;
        rl.close();
        callback(null);
      });
    }

    ], function(err) {
      database = new Database(config.databseUser, config.databasePassword, config.databaseUrl);
      database.createUser(config.username, config.password);
      config.password = '******';
      console.log(config);
      config = JSON.stringify(config, null, 2);
      fs.writeFileSync('./blog.config', config);
      cb();
    });

};