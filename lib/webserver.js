'use strict';

var express = require('express');
var path = require('path');
var fs = require('fs');

var nodemailer = require('nodemailer');
var htmlBuilder = require('./html-builder');

module.exports = function setupBlog(settings, mailTransport){
  
  var app = express();

  var config = JSON.parse(fs.readFileSync('./blog.config'));
  htmlBuilder.buildNavbar(settings.navbar);
  app.set('view options', {layout: false});
  app.configure(function() {
    app.use(express.static(path.join(__dirname, '../', 'resources', 'html')));
    app.use(express.static(path.join(__dirname, '../', 'resources')));
    app.use(express.bodyParser());
  });

  app.get('/', function(req, res) {
      res.render('index.html');
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

  app.listen(config.blogPort);
  console.log('Blog is running on port ' + config.blogPort);

};

