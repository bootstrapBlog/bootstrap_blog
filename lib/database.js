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
  // this.getLatestBlogPost();
  // this.createBlogPost('der erste blog eintrag', '<form role="form" name="contactForm"><div class="row"><div class="form-group col-md-3"><label for="inputEmail">Email address</label><input type="email" class="form-control" id="inputEmail" placeholder="Enter email"></div><div class="form-group col-md-3"><label for="inputName">Name</label><input type="text" class="form-control" id="inputName" placeholder="Name"></div></div><div class="row"><div class="form-group col-md-3"><label for="inputTopic">Topic</label><input type="text" class="form-control" id="inputTopic" placeholder="Topic"></div></div><br/><div class="row"><div class="form-group col-md-12"><label for="Text">Text</label><textarea type="text" class="form-control" id="inputText" placeholder="Your Message"></textarea></div></div><button type="submit" class="btn btn-default" onclick="">Send</button></form>', 'Adrian Ortmann');
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
  var userData = this.encryptUser(name, password);
  this.User.findOne(userData, function(err, user) {
    if(user) {
      console.log('User exists!');
      console.log(user);
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

Database.prototype.encryptUser = function(username, password) {
  return encrypt({username: username, password: password});
};

Database.prototype.authenticateUser = function(username, password, cb) {
  var userData = this.encryptUser(username, password);

  this.User.findOne({username: userData.username}, function(err, user) {
    if(!user || user.password !== userData.password) {
      cb(false);
    }
    cb(true);
  });
};
Database.prototype.getLatestBlogPost = function(cb) {
  this.BlogPost.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, post) {
    cb(post);
  });
};

Database.prototype.getBlogPostByTitle = function(title, cb) {
  while(title.indexOf('_') !== -1) {
    title = title.replace('_', ' ');
  }

  this.BlogPost.findOne(title, function(err, blogPost) {
    if(blogPost) {
      cb(blogPost);
    }
  });
};