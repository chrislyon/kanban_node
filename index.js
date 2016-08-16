// Load http module.
var http = require('http');
var path = require('path');
// Load express module.
var express = require('express');

var bodyParser  = require('body-parser');

 
// Initialize app object.
var app = new express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/tc3', function(req, res) {
   res.render('tc3');
	});

app.get('/modal1', function(req, res) {
   res.render('modal1');
	});

// TEST AVEC DATATABLES
app.get('/tdp1', function(req, res) {
   res.render('tdp1');
	});
app.get('/tdp1/arrays.json', function(req, res) {
	res.sendFile(path.join(__dirname, 'public', 'arrays.json'));
	});

// TEST AVEC POST
app.get('/tp1', function(req, res) {
   res.render('tp1');
	});

app.post('/tp1', function(req, res) {
	console.log("Data receive : ");
	console.log(req.body);
	});
 
// Create server and listen on port 3030.
http.createServer(app).listen(3030, function() {
    console.log('Server running Port = 3030...');
});
