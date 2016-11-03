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
	let json = `{"data":[{"type":"claimFile","id":"FR11P00000000","attributes":{"wan":"FR11P00000000","wanType":"R","customerInformation":{"customerName":"Nadine Morano","customerNumber":"213542","policyNumber":"213542"},"contract":{"contractNumber":"213542"},"claimInformation":{"dateOfLoss":"2011-09-28","dateOfEvent":"2011-09-28"},"descriptionOfRisk":[],"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"215343","createdAt":"2016-10-27 15:47:08","updatedAt":"2016-11-03 17:45:31","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":""}},{"type":"claimFile","id":"FR40P90000000","attributes":{"wan":"FR40P90000000","wanType":"T","customerInformation":{"customerName":"Mark","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"4","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0003","customerOrigin":"FR0003"}},{"type":"claimFile","id":"FR50P90000000","attributes":{"wan":"FR50P90000000","wanType":"T","customerInformation":{"customerName":"Philippe","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"3","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0002","customerOrigin":"FR0002"}},{"type":"claimFile","id":"FR60P90000000","attributes":{"wan":"FR60P90000000","wanType":"T","customerInformation":{"customerName":"Jean","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"2","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":"FR0001"}},{"type":"claimFile","id":"FR70P90000000","attributes":{"wan":"FR70P90000000","wanType":"L","customerInformation":{"customerNumber":"101","customerName":"Dupont","policyNumber":"101"},"contract":{"contractNumber":"101"},"claimInformation":{"claimNumber":"1","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"House","numberOfRooms":"6","totalSize":"84"},"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"101","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":"FR0001"}}],"links":{"self":{"href":""}}}`;

	let body = JSON.parse(json);
	res.send(body);
});

/**
 * Create claimfile
 */
app.post('/claim_file', function(req, res){
	
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
			res.json(body);
		}
		else {
			console.log(response.statusCode);
			res.send(body);
		}
	});

});

app.get('/claim_file/:id', function(req, res) {

	let json = `{"data":{"type":"claimFile","id":"FR11P00000000","attributes":{"wan":"FR11P00000000","wanType":"R","customerInformation":{"customerName":"Nadine Morano","customerNumber":"213542","policyNumber":"213542"},"contract":{"contractNumber":"213542"},"claimInformation":{"dateOfLoss":"2011-09-28","dateOfEvent":"2011-09-28"},"descriptionOfRisk":[],"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"215343","createdAt":"2016-10-27 15:47:08","updatedAt":"2016-10-31 19:50:03","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":""}},"links":{"self":{"href":""}}}`;
	let body = JSON.parse(json)

	res.send(body);
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

	let json, body; 

	if (req.body.context === "CustomerInformation") {
		json = `{"data":[{"id":"","type":"default","attributes":{"name":"default","fields":[{"id":"c3b48bba-9531-11e6-b05a-525400bd971e","name":"soleraClaimFileNumber","label":"Solera claim file number","type":"integer","text":"Solera claim file number","path":"ClaimFile.CustomerInformation.soleraClaimFileNumber","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"c3b7a8b1-9531-11e6-b05a-525400bd971e","name":"soleraActorNumber","label":"Solera actor number","type":"integer","text":"Solera actor number","path":"ClaimFile.CustomerInformation.soleraActorNumber","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":null},{"id":"c3baa172-9531-11e6-b05a-525400bd971e","name":"customerReference","label":"Customer's reference","type":"text","text":"Customer's reference","path":"ClaimFile.CustomerInformation.customerReference","value":null,"minLength":"2","maxLength":"5","choices":null,"mandatory":true},{"id":"c3c75916-9531-11e6-b05a-525400bd971e","name":"email","label":"email","type":"email","text":"email","path":"ClaimFile.CustomerInformation.email","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":null},{"id":"c3cad0e1-9531-11e6-b05a-525400bd971e","name":"policyHolderDateOfBirth","label":"PolicyHolder's date of birth","type":"date","text":"PolicyHolder's date of birth","path":"ClaimFile.CustomerInformation.policyHolderDateOfBirth","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"c3ce64c4-9531-11e6-b05a-525400bd971e","name":"typeOfInsured","label":"Type of insured","type":"dropdown","text":"Type of insured","path":"ClaimFile.CustomerInformation.typeOfInsured","value":null,"minLength":null,"maxLength":null,"choices":{"OWNER_OCCUPIED":"An owner occupied (or personal homeowner)","NON_OWNER_OCCUPIED":"A non-owner occupied","CO_OWNER_OCCUPIED":"A co-owner-occupied (or Condo))","NON_CO_OWNER_OCCUPIED":"A non co-owner occupied","TENANT_OCCUPANCY":"A tenant occupancy","NON_OCCUPANT":"A tenant given the day off (non-occupant)"},"mandatory":true},{"id":"c3e8abd0-9531-11e6-b05a-525400bd971e","name":"communicationChannel","label":"communication channel","type":"dropdown","text":"communication channel","path":"ClaimFile.CustomerInformation.communicationChannel","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":null}]}},{"type":"Policy Holder","attributes":{"name":"Policy Holder","fields":[{"id":"c3bdd0cf-9531-11e6-b05a-525400bd971e","name":"customerName","label":"Customer's name","type":"text","text":"Customer's name","path":"ClaimFile.CustomerInformation.customerName","value":"Danielle3","minLength":"2","maxLength":"32","choices":null,"mandatory":true},{"id":"c3c0cb27-9531-11e6-b05a-525400bd971e","name":"title","label":"Title","type":"text","text":"Title","path":"ClaimFile.CustomerInformation.title","value":null,"minLength":null,"maxLength":"5","choices":null,"mandatory":true},{"id":"c3c41d3f-9531-11e6-b05a-525400bd971e","name":"telephoneNumber","label":"telephone number","type":"text","text":"telephone number","path":"ClaimFile.CustomerInformation.telephoneNumber","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":null}]}},{"type":"Address","attributes":{"name":"Address","fields":[{"id":"c3d24ee7-9531-11e6-b05a-525400bd971e","name":"policyholderAddress1","label":"Policyholder Address 1","type":"text","text":"Policyholder Address 1","path":"ClaimFile.CustomerInformation.policyholderAddress1","value":null,"minLength":null,"maxLength":"32","choices":null,"mandatory":true},{"id":"c3d5db6e-9531-11e6-b05a-525400bd971e","name":"policyholderAddress2","label":"Policyholder Address 2","type":"text","text":"Policyholder Address 2","path":"ClaimFile.CustomerInformation.policyholderAddress2","value":null,"minLength":null,"maxLength":"32","choices":null,"mandatory":null},{"id":"c3d94281-9531-11e6-b05a-525400bd971e","name":"policyholderAddress3","label":"Policyholder Address 3","type":"text","text":"Policyholder Address 3","path":"ClaimFile.CustomerInformation.policyholderAddress3","value":null,"minLength":null,"maxLength":"32","choices":null,"mandatory":null},{"id":"c3dd05d3-9531-11e6-b05a-525400bd971e","name":"policyholderAddressPostcode","label":"Policyholder address postcode","type":"text","text":"Policyholder address postcode","path":"ClaimFile.CustomerInformation.policyholderAddressPostcode","value":null,"minLength":null,"maxLength":"5","choices":null,"mandatory":true},{"id":"c3e103e7-9531-11e6-b05a-525400bd971e","name":"policyholderTown","label":"Policyholder town","type":"text","text":"Policyholder town","path":"ClaimFile.CustomerInformation.policyholderTown","value":null,"minLength":null,"maxLength":"26","choices":null,"mandatory":true},{"id":"c3e4fcda-9531-11e6-b05a-525400bd971e","name":"policyholderCountry","label":"Policyholder country","type":"country","text":"Policyholder country","path":"ClaimFile.CustomerInformation.policyholderCountry","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true}]}}],"links":{"self":{"href":"/app_dev.php/forms/v1/claimFile/FR75P00000012/CustomerInformation"}},"jsonapi":{"version":"1.0"}}`;
		body = JSON.parse(json);
	}
	
	res.send(body);
});

/**
 * Get steps
 */
app.get('/steps', (req, res) => {	
	let json = `{"data":[{"type":"step","id":"RECEIPT_NOTICE_CLAIM","attributes":{"id":"RECEIPT_NOTICE_CLAIM","name":"RECEIPT_NOTICE_CLAIM","label":"Receipt notice claim","rank":1}},{"type":"step","id":"CHECK_CONTRACT","attributes":{"id":"CHECK_CONTRACT","name":"CHECK_CONTRACT","label":"Check contract","rank":2}},{"type":"step","id":"VALIDATE_CONTRACT","attributes":{"id":"VALIDATE_CONTRACT","name":"VALIDATE_CONTRACT","label":"Validate contract","rank":3}},{"type":"step","id":"COVERAGE_CHECKING","attributes":{"id":"COVERAGE_CHECKING","name":"COVERAGE_CHECKING","label":"Coverage checking","rank":4}},{"type":"step","id":"DAMAGE_ESTIMATION","attributes":{"id":"DAMAGE_ESTIMATION","name":"DAMAGE_ESTIMATION","label":"Damage estimation","rank":5}},{"type":"step","id":"FRAUD_DETECTION","attributes":{"id":"FRAUD_DETECTION","name":"FRAUD_DETECTION","label":"Fraud detection","rank":6}},{"type":"step","id":"INDEMNITIES_EVALUATION","attributes":{"id":"INDEMNITIES_EVALUATION","name":"INDEMNITIES_EVALUATION","label":"Indemnities evaluation","rank":7}},{"type":"step","id":"AUTHORIZED_CUSTOMER_REPAIRER","attributes":{"id":"AUTHORIZED_CUSTOMER_REPAIRER","name":"AUTHORIZED_CUSTOMER_REPAIRER","label":"Authorized customer repairer","rank":8}},{"type":"step","id":"ASSIGNMENT_OF_EXPERT","attributes":{"id":"ASSIGNMENT_OF_EXPERT","name":"ASSIGNMENT_OF_EXPERT","label":"Assignment of expert","rank":9}},{"type":"step","id":"LOSS_SETTLEMENT","attributes":{"id":"LOSS_SETTLEMENT","name":"LOSS_SETTLEMENT","label":"Loss settlement","rank":10}},{"type":"step","id":"MAKE_AN_APPEAL","attributes":{"id":"MAKE_AN_APPEAL","name":"MAKE_AN_APPEAL","label":"Make an appeal","rank":11}},{"type":"step","id":"CLOSING","attributes":{"id":"CLOSING","name":"CLOSING","label":"Closing","rank":12}}],"links":{"self":{"href":"/app_dev.php/steps/v1/"}},"jsonapi":{"version":"1.0"}}`;
	let body = JSON.parse(json);

	res.send(body);
});

// Homescreen : claimFile list
/* Serve homescreen page for react poke purpose
app.get('/claimFile/list', function(req, res){
	res.sendFile(path.resolve('client/claimHandler_home.html'));
});*/

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});