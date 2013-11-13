'use strict';

var express = require('express');
// var http = require('http')
// var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

passport.use(new LocalStrategy(function(username, password, done) { 
  // insert your MongoDB check here. For now, just a simple hardcoded check.
  if (username === 'foo' && password === 'bar')
  {
    done(null, { user: username });
  }
  else
  {
    done(null, false);
  }
}));

passport.serializeUser(function(user, done) { 
  // please read the Passport documentation on how to implement this. We're now
  // just serializing the entire 'user' object. It would be more sane to serialize
  // just the unique user-id, so you can retrieve the user object from the database
  // in .deserializeUser().
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  // Again, read the documentation.
  done(null, user);
});


/// OLD!

'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var nodemailer = require('nodemailer');


module.exports = function setupBlog(mailTransport, database){
  var app = express();
  var config = JSON.parse(fs.readFileSync('./blog.config'));
  
  app.set('view options', {layout: false});
  app.configure(function() {
    app.use(express.static(path.join(__dirname, '../', 'resources', 'html')));
    app.use(express.static(path.join(__dirname, '../', 'resources')));
    app.use(express.cookieParser('your secret here'));
    app.use(express.session());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);

    // try


  });

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

  app.get('/auth', function(req, res) {
    var start = req.url.indexOf('=')+1;
    var end = req.url.indexOf('&');
    var offset = 10;
    var username = req.url.slice(start, end);
    var password = req.url.slice(end+offset, req.url.length);

    database.authenticateUser(username, password, function(authenticationSuccessful) {
      if(authenticationSuccessful)
        res.send(200, { login: true });

      res.send({});
    });
  });

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

  app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

  passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('local strategy called with: %s', username);
    return done(null, {name: username});
  }));

  app.listen(config.blogPort);
  console.log('Blog is running on port ' + config.blogPort);

};
