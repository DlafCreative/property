var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var http = require('http');

var rickouest = require('request');

/**
 * Define backend location
 */
var argv = require('minimist')(process.argv.slice(2));
const SERVER_CONFIG = require('../config/server.params');
var server_url = `${SERVER_CONFIG.BACKEND_HOST}:${SERVER_CONFIG.BACKEND_PORT}/`;
if (argv['env'] && argv['env'] === 'dev') {
	server_url += 'app_dev.php/'
}
var getFullPath = (path) => {
	return `${server_url}${path}`;
}

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

app.set('port', (process.env.PORT || 7000));

function requestCallback(error, reponse, body) {}

/**
 ****************************** Routes ******************************
 */
/**
 * Authentication
 **/
app.post('/authenticate', function(req, res){
	const URI = getFullPath('oauth/v2/token');
	let username = `${req.body.customer_number}\\${req.body.username}`;	
	let reqOptions = {
		uri: URI,
		method: 'POST', 
		form: {
			username: username,
			password: req.body.password,
			grant_type: 'password',
			client_id: '1_3g9z7wonyeck0wco00cgggoogcgk008gko0ow84ssoowsock0f',
			client_secret: '4zh7wm12w1wk8c8swccws0gosk8c0o8wcko0kcwoccg4k8o08f'
		},
		json: true
	}
	
	rickouest(reqOptions, (error, response, body) => {
		res.statusCode = (error) ? 503 : response.statusCode;
		if (res.statusCode === 400) { // Invalid grant, send json-api response
			body = {
				errors:[{
					status: 400,
					title: response.body.error,
					detail: response.body.error_description
				}]
			}
		}
		res.json(body);
	});
});

/**
 * Get claimfiles
 */
app.get('/claimfiles', function(req, res){
	const URI = getFullPath('claimFiles/v1');
	var reqOptions = {
		uri: 	URI,
		method: 'GET', 
		headers: {
			'Authorization': req.headers.authorization
		},
		json: true
	}

	rickouest(reqOptions, (error, response, body) => {
		if (!error) {
			res.statusCode = response.statusCode;
			res.json(body);
		}
		else  {
			res.statusCode = 503;
			res.json(error);
		}
	})
});

/**
 * Create claimfile
 */
app.post('/claimfile', function(req, res){
	const URI = getFullPath('claimFiles/v1/');
	let reqOptions = {
		uri: URI,
		method: 'POST', 
		headers: {
			'Authorization': req.headers.authorization
		},
		json: true,
		form: req.body
	}
	
	rickouest(reqOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
		else {
			res.statusCode = response.statusCode;
			console.log(response);
			res.json(body);
		}
	});

});

/**
 * Get claimfile
 */
app.get('/claimfile/:id', function(req, res) {
	const PATH = `claimFiles/v1/${req.params.id}`;
	const URI = getFullPath(PATH);

	var rickouestOptions = {
		uri: URI,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		},
		json: true
	}

	rickouest(rickouestOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
		else {
			console.log(response);
			res.json(body);
		}
	});

});

/**
 * Get and submit form part
 */
app.all('/form-part/:claimFileId/:context', (req, res) => {

	// Response for the preflight 
	if (req.method === 'OPTIONS') {
		res.end();
	}
	else {
		const PATH = `forms/v1/claimFile/${req.params.claimFileId}/${req.params.context}`;
		const URI = getFullPath(PATH);

		let rickouestOptions = {
			uri : URI,
			method: req.method,
			headers: {
				'Authorization': req.headers.authorization
			},
			json: true
		}

		/** Submit form, API doesn't expect json' */
		if (req.method === 'POST') {
			rickouestOptions.form = req.body;
			rickouestOptions.json = false
		}
		
		rickouest(rickouestOptions, (error, response, body) => {
			if (req.method === 'POST') {
				body = JSON.parse(body);
			}
			if (!error && (typeof response !== "undefined") && response.statusCode == 200) {	
				res.json(body);
			}
			else {
				res.statusCode = response.statusCode;
				res.json(body);
			}
		});
	}

});

/**
 * Get list of coverages
 */
app.get('/coverages', (req, res) => {
	const URI = getFullPath('coverages/v1');	

	let rickouestOptions = {
		uri: URI,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		},
		json: true
	}

	rickouest(rickouestOptions, (error, response, body) => {	
		if (!error && (typeof response !== "undefined") && response.statusCode == 200) {
			res.json(body);
		}
		else {
			console.log(response)
			res.json(body);
		}
	});
});

/**
 * Get steps
 */
app.get('/steps', (req, res) => {
	const URI = getFullPath('steps/v1');

	let rickouestOptions = {
		uri: URI,
		method: 'GET',
		headers: {
			'Authorization': req.headers.authorization
		},
		json: true
	}

	rickouest(rickouestOptions, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			res.json(body);
		}
		else {
			console.log(response);
			res.json(body)
		}
	});
});

/**
 * Listen to that port
 */
app.listen(app.get('port'), function() {
  console.log(`Serveur NodeJS démarré sur le port ${app.get('port')}, bravo !`);
});