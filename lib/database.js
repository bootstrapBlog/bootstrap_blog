'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

module.exports.connect = function() {
  var db = mongoose.createConnection('localhost', 'bootstrap_blog');
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function(){
    var userSchema = new Schema({
      username: { type: String, required: true },
      password: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    });
    var User = mongoose.model('User', userSchema);
    
    mongoose.connect('mongodb://localhost/bootstrap_blog');
    var db = mongoose.connection;
    db.on('open', function() {
      var admin = new User({
        username: 'admin',
        password: 'admin'
      });
      admin.save(function(err) {
        if(err) return console.error(err);
      });
    });
  });
};