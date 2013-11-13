'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');
// var http = require('http');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');

var app = express();

module.exports = function setupBlog(mailTransport, database){
  var config = JSON.parse(fs.readFileSync('./blog.config'));
  
  // app.set('view options', {layout: false});

  
  app.use(express.static(path.join(__dirname, '../', 'resources', 'html')));
  app.use(express.static(path.join(__dirname, '../', 'resources')));

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret' }));
  app.use(passport.initialize());
  app.use(passport.session());


  app.post('/contactMe/new', function(req, res){
    res.send(req.body);
    var smtpTransport = nodemailer.createTransport('SMTP', mailTransport);
    var mailOptions = {
      from: mailTransport.auth.user,
      to: mailTransport.mailReceiver,
      subject: req.body.topic,
      text: req.body.text,
    };
    smtpTransport.sendMail(mailOptions, function(err, res) {
      if(err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + res.message);
      }
    });
  });

  // app.get('/auth', function(req, res) {
  //   var start = req.url.indexOf('=')+1;
  //   var end = req.url.indexOf('&');
  //   var offset = 10;
  //   var username = req.url.slice(start, end);
  //   var password = req.url.slice(end+offset, req.url.length);

  //   database.authenticateUser(username, password, function(authenticationSuccessful) {
  //     if(authenticationSuccessful)
  //       res.send(200, { login: true });

  //     res.send({});
  //   });
  // });

  app.get('/blog/:blogTitle', function(req, res) {
    var blogTitle = req.params.blogTitle;
    if(blogTitle === 'newest'){
      database.getLatestBlogPost(function(post) {
        res.send(post);
      });
    } else {
      database.getBlogPostByTitle(blogTitle, function(blogPost) {
        res.send(blogPost);
      });
    }
  });

  app.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/fail',
    failureFlash: true
  }));

  app.get('/admin', function(req, res) {
    res.send(200, path.join(__dirname, '../', 'resources', 'html', 'adminArea.html'));
  });

  passport.use(new LocalStrategy(function(username, password, done) {
    console.log(username);
    console.log(password);
    if(username === 'admin' && password === 'admin') {
      done(null, { username: username });
    }
    else {
      done(null, false);
    }
  }));

  passport.serializeUser = function(user, done) {
    done(null, user);
  };

  passport.deserializeUser = function(user, done) {
    done(null, user);
  };
  
  app.listen(config.blogPort);
  console.log('Blog is running on port ' + config.blogPort);

};