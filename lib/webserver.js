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
  
  // app.use(express.static(path.join(__dirname, '../', 'resources', 'html')));
  // app.use(express.static(path.join(__dirname, '../', 'resources')));
  // app.use(express.cookieParser());
  // app.use(express.session());
  // app.use(passport.initialize());
  // app.use(passport.session());
  // app.use(app.router);

  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret' }));
  app.use(passport.initialize());
  app.use(passport.session());


  // app.post('/contactMe/new', function(req, res){
  //   res.send(req.body);
  //   var smtpTransport = nodemailer.createTransport('SMTP', mailTransport);
  //   var mailOptions = {
  //     from: mailTransport.auth.user,
  //     to: mailTransport.mailReceiver,
  //     subject: req.body.topic,
  //     text: req.body.text,
  //   };
  //   smtpTransport.sendMail(mailOptions, function(err, res) {
  //     if(err) {
  //       console.log(err);
  //     } else {
  //       console.log('Message sent: ' + res.message);
  //     }
  //   });
  // });

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

  passport.use(new LocalStrategy(function(username, password, done) {
    // database.login(username, password, done);
    if (username === 'admin' && password === 'admin')
    {
      done(null, { user: username });
    }
    else
    {
      done(null, false);
    }
  }));
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/accessed',
    failureRedirect: '/access'
  }));


  

  app.listen(config.blogPort);
  console.log('Blog is running on port ' + config.blogPort);

};
