'use strict';

var express = require('express');
var path = require('path');

var app = express();

app.set('view options', {layout: false});
app.configure(function() {
	app.use(express.static(path.join(__dirname, 'resources', 'html')));
	app.use(express.static(path.join(__dirname, 'resources')));
});

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(8080);