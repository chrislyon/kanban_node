// Load http module.
var http = require('http');
var path = require('path');
// Load express module.
var express = require('express');
var morgan = require('morgan')
var bodyParser  = require('body-parser');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/data.dbf');

 
// Initialize app object.
var app = new express();

// Log
app.use(morgan(':date :method :url :http-version :response-time :status :remote-addr :referrer'));

// Decode des POST json et HTML
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

//Avec DATAABLES + SQLITE3
app.get('/tdp2', function(req, res) {
   res.render('tdp2');
	});

app.get('/tdp2/all_salaries', function(req, res) {
		db.all("SELECT * FROM salaries", function (err, rows) {
			r = {};
			//console.log(JSON.stringify(rows[0]));
			//arr_rows = rows.map(function (item) { return [item.name, item.position, item.office, item.extn, item.start_date, item.salary ]; });
			//arr_rows = rows.map(function (item) { return Object.values(item) }); //Marche pas :(
			// Exemple de table
			// 	table#example( class="table table-striped table-bordered" cellspacing="0" width="100%" )
			// 			thead
			// 				tr
			// 					th Name
			// 					th Position
			// 					th Office
			// 					th Extn
			// 					th Start_Date
			// 					th Salary
			// 	Schema SQLITE
			// 	CREATE TABLE salaries ( name varchar(30), position varchar(30), office varchar(30), extn varchar(5), start_date date, salary number(10) );
			//
			//	script.
			//			$(document).ready(function() {
			//						$('#example').DataTable( {
			//										"ajax": "/tdp2/all_salaries", <= URL
			//														} );
			//																} );
			//
			//
			// C'est magique il suffit d'avoir la <table> declarée dans le meme ordre et cela fonctionne
			//
			arr_rows = rows.map(function (item) { return Object.keys(item).map(function(key){return item[key]}) });
			console.log( arr_rows );
			debugger;
			r.data = arr_rows ;
			s = JSON.stringify(r);
			res.send( s );
		});
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
