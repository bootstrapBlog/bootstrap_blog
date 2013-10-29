var readline = require('readline');
var async = require('async');
var fs = require('fs');

module.exports = function(){

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  var config = {};

  async.series([
    function(cb) {
      rl.question('Which port do you want the blog to listen on? ', function(port){
        config.blogPort = port;
        cb(null);
      });
    },
    function(cb){
      rl.question('What is the url of your database? ', function(url){
        config.databaseUrl = url;
        cb(null);
      });
    },
    function(cb){
    rl.question('Admin username: ', function(name){
      config.username = name;
      cb(null);
    });
    },
    function(cb){
      rl.question('Admin password: ', function(name){
        config.password = name;
        rl.close();
        cb(null);
      });
    }

    ], function(err){
      console.log(config);
      config = JSON.stringify(config, null, 2);
      fs.writeFileSync('./blog.config', config);
    });

}();