const SERVER_CONFIG = require('../config/server.params');

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var http = require('http');
var querystring = require('querystring');

var rickouest = require('request');

app.set('port', (process.env.PORT || 7000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

/**
 * @Todo : maybe need to disable this bodyParser option for authentication route, as it's not in json-api format
 */
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Set to json-api format
//app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

	// Allow every CRUD operations
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    // Also set permissive headers allowing to set any Content-Type
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/**
 * Routes
 */
// Login screen
app.get('/', function(req, res){
  res.sendFile(path.resolve('client/index.html'));
});

/**
 * API 
 **/
app.post('/authenticate', function(req, res){

	// Formatting user params
	let username = `${req.body.customer_number}\\${req.body.username}`;
	let password = req.body.password;

	console.log(req.body);

	// Request needs querystring
	let postData = querystring.stringify({		
		client_id: '1_3g9z7wonyeck0wco00cgggoogcgk008gko0ow84ssoowsock0f',
		client_secret: '4zh7wm12w1wk8c8swccws0gosk8c0o8wcko0kcwoccg4k8o08f',
		username: username,
		password: password,
		grant_type: 'password'
	})

	// Add http.request options
	 let options = {
	 	host: 'api.property.local',
	 	path: '/app_dev.php/oauth/v2/token',
	 	method: 'POST',
	 	headers: {
			'Content-Type': 'application/x-www-form-urlencoded',	 		
	 		'Content-Length': Buffer.byteLength(postData)
	 	}
	 };

	 var request = http.request(options, function(httpResponse){
	 	var body = '';
	 	httpResponse.on('data', function(chunk){
	 		body += chunk;
	 	});
	 	httpResponse.on('end', function(){
	 		let parsedBody = JSON.parse(body);
	 		res.send(parsedBody);
	 	})
	 }).on('error', function(err){
	 	console.log(err);
	 });

	 // Write data
	 request.write(postData);

	 // End request 
	 request.end();

});

/**
 * Get claimfiles
 */
app.get('/claimFiles/v1', function(req, res){
	var options = {
		uri: 	'http://api.property.local/app_dev.php/claimFiles/v1',
		method: 'GET', 
		headers: {
			'Authorization': `Bearer ${req.query.token}`
		}
	}

	rickouest(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.send(parsedBody);
		}
		else {
			console.log(response)
		}
	})
});

/**
 * Create claimfile
 */
app.post('/claimfile', function(req, res){
	
	let reqOptions = {
		uri: 'http://api.property.local/app_dev.php/claimFiles/v1/',
		method: 'POST', 
		headers: {
			'accept': 'application/vnd.api+json',
			'Content-type': 'application/vnd.api+json',
			'Authorization': req.headers.authorization
		},
		json: true,
		body: req.body
	}
	
	rickouest(reqOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.json(parsedBody);
		}
		else {
			console.log(response.statusCode);
			res.send(body);
		}
	});

});

/**
 * Get claimfile
 */
app.get('/claimfile/:id', function(req, res) {

	var rickouestOptions = {
		uri: `http://api.property.local/app_dev.php/claimFiles/v1/${req.params.id}`,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		}
	}

	rickouest(rickouestOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.send(parsedBody);
		}
		else {
			console.log(response)
		}
	});

});

/**
 * Get single claimfile (old)
 */
app.get('/claimFile/:id', function(req, res){
	var options = {
		uri: 	'http://api.property.local/app_dev.php/claimFiles/v1/' + req.params.id,
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${req.query.token}`			
		}
	}

	rickouest(options, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.send(parsedBody);
		}
		else {
			console.log(response)
		}
	})
});

/**
 * Get form metadatas
 */
app.post('/form-metadata', (req, res) => {

	let uri = `http://192.168.33.10:22201/app_dev.php/forms/v1/claimFile/${req.body.claimFileId}/${req.body.context}`;

	let rickouestOptions = {
		uri: uri,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		}
	}; 

	rickouest(rickouestOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.send(parsedBody);
		}
		else {
			console.log(response)
		}
	});

});

/**
 * Submit form part // @todo : bring get form-metadata here, same final uri, almost same logic.
 */
app.all('/form-part', (req, res) => {

	// Response for the preflight 
	if (req.method === 'OPTIONS') {
		res.end();
	}
	else {
		let uri = `http://192.168.33.10:22201/app_dev.php/forms/v1/claimFile/${req.body.claimFileId}/${req.body.context}`;

		let rickouestOptions = {
			uri : uri,
			method: req.method,
			headers: {
				'Authorization': req.headers.authorization
			}
		}

		if (req.method === 'POST') {
			rickouestOptions.form = req.body.formPartData;
		}
		
		rickouest(rickouestOptions, (error, response, body) => {
			console.log(error);
			if (!error && (typeof response !== "undefined") && response.statusCode == 200) {
				let parsedBody = JSON.parse(body);
				res.json(parsedBody);
			}
			else {
				console.log(response)
				res.send(body);
			}
		});
	}

});

/**
 * Get list of coverages
 */
app.get('/coverages', (req, res) => {
	
	let uri = `${SERVER_CONFIG.BACKEND_HOST}:${SERVER_CONFIG.BACKEND_PORT}/app_dev.php/coverages/v1`;

	let rickouestOptions = {
		uri: uri,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		}
	}

	rickouest(rickouestOptions, (error, response, body) => {	
		if (!error && (typeof response !== "undefined") && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.json(parsedBody);
		}
		else {
			console.log(response)
			res.send(body);
		}
	});
});

/**
 * Get steps
 */
app.get('/steps', (req, res) => {

	let uri = 'http://192.168.33.10:22201/app_dev.php/steps/v1';

	let rickouestOptions = {
		uri: uri,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		}
	}

	rickouest(rickouestOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			let parsedBody = JSON.parse(body);
			res.send(parsedBody);
		}
		else {
			console.log(response)
		}
	});
});

// Homescreen : claimFile list
/* Serve homescreen page for react poke purpose
app.get('/claimFile/list', function(req, res){
	res.sendFile(path.resolve('client/claimHandler_home.html'));
});*/

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});