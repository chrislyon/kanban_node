// Load http module.
var http = require('http');
var path = require('path');
// Load express module.
var express = require('express');
var morgan = require('morgan')
var bodyParser  = require('body-parser');
var jade = require('jade');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/data.dbf');

var heredoc = require('heredoc');
 
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
app.locals.basedir = path.join(__dirname, '.');
 
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
			// avec les noms en dur cela fonctionne mais c'est pas top
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

// TEST Dynamique
// Cela fonctionne mais cela ne prends pas en compte les extends
// Maintenant cela prends en compte les extends mais attention au \n a la fin de chaque ligne"
app.get('/dyn1', function(req, res) {
	//var page = "html\n"
	
	var page = "extends ../node_modules/jade-bootstrap/_bootstrap\n";

	page += "block body\n";
	page += "\t.container\n";
	page += "\t\th1 Test de page Dynamique \n";
	page += "\t\tp.lead\n";
	page += "\t\t\t| Cette page a ete genere dynamiquement \n";
	page += "\t\t\tbr\n";
	page += "\t\t\t| Cette page a ete genere dynamiquement \n";
	page += "\t\th2 Modal Example\n";
	page += '\t\t\tbutton(type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal") Open Modal\n';

	// views/index.jade est un fichier fictif
	html = jade.render(page, { pretty: true, filename: path.join(__dirname, 'views/index.jade') });

	res.send(html);

	});

// =========================
// datatables dynamique 
// =========================
app.get('/dyn2', function (req,res) {
	var page = heredoc( function() { /*
block styles 
	link(rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css")
	link(rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css")
	link(rel="stylesheet" href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css")

block scripts
	// Jquery Origine
	//script(src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js")
	script(src='https://cdn.rawgit.com/konvajs/konva/1.0.0/konva.min.js')
	script(src="https://code.jquery.com/jquery-1.12.4.js")
	script(src="https://code.jquery.com/ui/1.12.0/jquery-ui.js")
	script(src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js")

block body
	// le .container pour les objets jade-bootstrap 
	.container
		#entete
			p 
				Center 
					h2 DYNAMIC DATATABLES

	table#example( class="table table-striped table-bordered" cellspacing="0" width="100%" )
		thead
			tr
				th Name
				th Position
				th Office
				th Extn
				th Start_Date
				th Salary
	script.
		$(document).ready(function() {
			$('#example').DataTable( {
				"ajax": "/tdp2/all_salaries",
				} );
		} );
										

	*/ });
	//
	// le fichier views/index.jade est necessaire je sais pas pourquoi
	html = jade.render(page, { pretty: true, filename: path.join(__dirname, 'views/index.jade') });

	res.send(html);
});


// =========================
// datatables dynamique 
// =========================
app.get('/dyn3', function (req,res) {
	var entete = heredoc( function() { /*
block styles 
	link(rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css")
	link(rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css")
	link(rel="stylesheet" href="https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css")

block scripts
	script(src='https://cdn.rawgit.com/konvajs/konva/1.0.0/konva.min.js')
	script(src="https://code.jquery.com/jquery-1.12.4.js")
	script(src="https://code.jquery.com/ui/1.12.0/jquery-ui.js")
	script(src="https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js")
	*/ });

	var body_1 = heredoc( function() { /*
block body
	// le .container pour les objets jade-bootstrap 
	.container
		#entete
			p 
				Center 
					h2 DYNAMIC DATATABLES
	*/ });

	var table = heredoc( function() { /*
	table#example( class="table table-striped table-bordered" cellspacing="0" width="100%" )
		thead
			tr
				th id
				th first_name
				th last_name
				th email
				th gender
				th ip_adress
		*/ });

	var scr = heredoc( function() { /*
	script.
		$(document).ready(function() {
			$('#example').DataTable( {
				"ajax": "/dyn3/MOCK_DATA",
				} );
		} );
										

	*/ });

	page = entete + body_1 + table + scr ;
	
	// le fichier views/index.jade est necessaire je sais pas pourquoi
	html = jade.render(page, { pretty: true, filename: path.join(__dirname, 'views/index.jade') });

	res.send(html);
});

app.get('/dyn3/MOCK_DATA', function(req, res) {
		db.all("SELECT * FROM MOCK_DATA", function (err, rows) {
			r = {};
			arr_rows = rows.map(function (item) { return Object.keys(item).map(function(key){return item[key]}) });
			//console.log( arr_rows );
			r.data = arr_rows ;
			s = JSON.stringify(r);
			res.send( s );
		});
	});

//
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
