// Load http module.
var http = require('http');
// Load express module.
var express = require('express');
 
// Initialize app object.
var app = new express();

// Use app.set to add the view engine.
// Ass app is an express object, it has a view engine property.
app.set('view engine', 'jade');
  
// Set path to views.
app.set('views', './views');
 
// Basic routing.
app.get('/', function(req, res) {
    // res.send is changed to result.render in order to load the correct view.
    res.render('index');
});

// My Routing
app.get('/tkonva1', function(req, res) {
   res.render('tkonva1');
	});

app.get('/tkonva2', function(req, res) {
   res.render('tkonva2');
	});

app.get('/tkonva3', function(req, res) {
   res.render('tkonva3');
	});

app.get('/tc1', function(req, res) {
   res.render('tc1');
	});

app.get('/tc2', function(req, res) {
   res.render('tc2');
	});

app.get('/modal1', function(req, res) {
   res.render('modal1');
	});
 
// Create server and listen on port 3030.
http.createServer(app).listen(3030, function() {
    console.log('Server running Port = 3030...');
});
