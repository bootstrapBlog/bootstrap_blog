'use strict';

var mongoose = require('mongoose');

var encrypt = require('./encrypt');

module.exports = Database;

function Database(databaseUser, databasePassword, databaseUrl) {
  var db = mongoose.connect('mongodb://' + databaseUser + ':' +databasePassword + '@' + databaseUrl);
  var User = {};
  var BlogPost = {};

  this.createUserSchema();
  this.createBlogPostSchema();
  this.createBlogPost('what title', 'poststsgdfg', 'it\'s me mario');
}

Database.prototype.createUserSchema = function() {
  this.User = mongoose.model('User', {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });
};

Database.prototype.createUser = function(name, password, email) {
  var newBlogUser = new this.User({
    username: name,
    password: password,
    email: email
  });
  newBlogUser.save(function(err) {
    if(err)
      console.log(err);
  });
};

Database.prototype.checkIfUserExistIfNotCreate = function(name, password, email) {
  var self = this;
  var userData = encrypt({username: name, password: password});
  this.User.findOne({username: userData.username}, function(err, user) {
    if(user) {
      console.log(user);
      console.log('User exists!');
      return true;
    }

  self.createUser(userData.username, userData.password, email);
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

Database.prototype.authenticateUser = function(username, password) {
  var userData = encrypt({username: name, password: password});

};