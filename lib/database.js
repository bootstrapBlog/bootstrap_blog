'use strict';

var mongoose = require('mongoose');

var encrypt = require('./encrypt')

module.exports = Database;

function Database(databaseUser, databasePassword, databaseUrl) {
  var db = mongoose.connect('mongodb://' + databaseUser + ':' +databasePassword + '@' + databaseUrl);
  var User = {};
  var BlogPost = {};

  var username = 'tesssssd';
  var password = 'pwd';

  this.createUserSchema();
  var userExists = this.checkIfUserExists(username);
  console.log(userExists);
  if(userExists) {
    return;
  } else {
    console.log('iwa....');
    var userData = encrypt({username: username, password: password});
    this.createUser(userData.username, userData.password);
  }
  this.createBlogPostSchema();
  this.createBlogPost('what title', 'poststsgdfg', 'it\'s me mario');
}

Database.prototype.createUserSchema = function() {
  this.User = mongoose.model('User', {
    username: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
};

Database.prototype.createUser = function(name, password) {
  var newBlogUser = new this.User({
    username: name,
    password: password
  });
  newBlogUser.save(function(err) {
    if(err)
      console.log(err);
  });
};

Database.prototype.checkIfUserExists = function(name) {
  this.User.findOne({username: name}, function(err, user) {
    console.log('komm rein');
    if(user) {
      console.log('User exists!');
      return true;
    }

    return false;
  });
};



Database.prototype.createBlogPostSchema = function() {
  this.BlogPost = mongoose.model('BlogPost', {
    title: { type: String, required: true },
    post: { type: String, required: true },
    author: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
  });
};

Database.prototype.createBlogPost = function(title, post, author) {
  var newBlogPost = new this.BlogPost({
    title: title,
    post: post,
    author: author
  });
  newBlogPost.save(function(err) {
    if(err)
      console.log(err);
  });
};