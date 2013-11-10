'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');

var nodemailer = require('nodemailer');


module.exports = function setupBlog(mailTransport, database){
  var app = express();
  var config = JSON.parse(fs.readFileSync('./blog.config'));
  
  app.set('view options', {layout: false});
  app.configure(function() {
    app.use(express.static(path.join(__dirname, '../', 'resources', 'html')));
    app.use(express.static(path.join(__dirname, '../', 'resources')));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
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

  app.post('/authentication', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    database.authenticateUser(username, password, function(value) {
      res.send(value);
    });
  });

  app.get('/userusername', function(req, res) {
    console.log(req);
  });

  app.listen(config.blogPort);
  console.log('Blog is running on port ' + config.blogPort);

};

