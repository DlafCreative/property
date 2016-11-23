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
app.get('/claimfiles', function(req, res){	
	let json = `{"data":[{"type":"claimFile","id":"FR11P00000000","attributes":{"wan":"FR11P00000000","wanType":"R","customerInformation":{"customerName":"Nadine Morano","customerNumber":"213542","policyNumber":"213542"},"contract":{"contractNumber":"213542"},"claimInformation":{"dateOfLoss":"2011-09-28","dateOfEvent":"2011-09-28"},"descriptionOfRisk":[],"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"215343","createdAt":"2016-10-27 15:47:08","updatedAt":"2016-11-03 17:45:31","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":""}},{"type":"claimFile","id":"FR40P90000000","attributes":{"wan":"FR40P90000000","wanType":"T","customerInformation":{"customerName":"Mark","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"4","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0003","customerOrigin":"FR0003"}},{"type":"claimFile","id":"FR50P90000000","attributes":{"wan":"FR50P90000000","wanType":"T","customerInformation":{"customerName":"Philippe","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"3","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0002","customerOrigin":"FR0002"}},{"type":"claimFile","id":"FR60P90000000","attributes":{"wan":"FR60P90000000","wanType":"T","customerInformation":{"customerName":"Jean","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"2","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":"FR0001"}},{"type":"claimFile","id":"FR70P90000000","attributes":{"wan":"FR70P90000000","wanType":"L","customerInformation":{"customerNumber":"101","customerName":"Dupont","policyNumber":"101"},"contract":{"contractNumber":"101"},"claimInformation":{"claimNumber":"1","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"House","numberOfRooms":"6","totalSize":"84"},"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"101","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":"FR0001"}}],"links":{"self":{"href":""}}}`;

	let body = JSON.parse(json);
	res.send(body);
});

/**
 * Create claimfile. Return a new claimfile if successfull
 */
app.post('/claimfile', function(req, res){	

	let json = `{"data":{"type":"claimFile","id":"FR11P00000000","attributes":{"wan":"FR11P00000000","wanType":"R","customerInformation":{"customerName":"Nadine Morano","customerNumber":"213542","policyNumber":"213542"},"contract":{"contractNumber":"213542"},"claimInformation":{"dateOfLoss":"2011-09-28","dateOfEvent":"2011-09-28"},"descriptionOfRisk":[],"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"215343","createdAt":"2016-10-27 15:47:08","updatedAt":"2016-10-31 19:50:03","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":""}},"links":{"self":{"href":""}}}`;
	let body = JSON.parse(json)

	res.send(body);
});

/**
 * Get claimfile
 */
app.get('/claimfile/:id', function(req, res) {

	let json = `{"data":{"type":"claimFile","id":"FR11P00000000","attributes":{"wan":"FR11P00000000","wanType":"R","customerInformation":{"customerName":"Nadine Morano","customerNumber":"213542","policyNumber":"213542"},"contract":{"contractNumber":"213542"},"claimInformation":{"dateOfLoss":"2011-09-28","dateOfEvent":"2011-09-28"},"descriptionOfRisk":[],"status":{"name":"PRE_NOTIFICATION_DONE","label":"Pre notification done","step":{"name":"REPORT_OPENING","label":"Report opening"}},"insurerExternalClaimFileId":"215343","createdAt":"2016-10-27 15:47:08","updatedAt":"2016-10-31 19:50:03","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":""}},"links":{"self":{"href":""}}}`;
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
	}
	else if (req.body.context === 'Contract') {
		json = `{"data":[{"type":"default","attributes":{"name":"default","fields":[{"id":"a0ad7155-9c5b-11e6-9d19-525400bd971e","name":"typeOfContract","label":"Type of contract","type":"dropdown","text":"Type of contract","path":"ClaimFile.Contract.typeOfContract","value":null,"minLength":null,"maxLength":null,"choices":{"MRH":"MRH","MRP":"MRP","MRI":"MRI","MRA":"MRA"},"mandatory":true},{"id":"a0ad9bb7-9c5b-11e6-9d19-525400bd971e","name":"policySituation","label":"Policy situation","type":"dropdown","text":"Policy situation","path":"ClaimFile.Contract.policySituation","value":null,"minLength":null,"maxLength":null,"choices":{"NEW":"New","REPLACE":"Replace","IN_PROGRESS":"In Progress","GIVEN_NOTICE":"Given notice","CLOSED":"Closed","PROJECT":"Project"},"mandatory":null},{"id":"a0adc612-9c5b-11e6-9d19-525400bd971e","name":"contractNumber","label":"Contract's number","type":"integer","text":"Contract's number","path":"ClaimFile.Contract.contractNumber","value":"213542","minLength":null,"maxLength":"17","choices":null,"mandatory":true},{"id":"a0adf3f4-9c5b-11e6-9d19-525400bd971e","name":"statusOfContract","label":"Status of contract","type":"dropdown","text":"Status of contract","path":"ClaimFile.Contract.statusOfContract","value":null,"minLength":null,"maxLength":null,"choices":{"IN_PROGRESS":"In Progress","GIVEN_NOTICE":"Given notice","CLOSED":"Closed","PROJECT":"Project"},"mandatory":true},{"id":"a0ae2350-9c5b-11e6-9d19-525400bd971e","name":"effectiveDate","label":"effective date","type":"date","text":"effective date","path":"ClaimFile.Contract.effectiveDate","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"a0ae5259-9c5b-11e6-9d19-525400bd971e","name":"typeOfProperty","label":"Type of property","type":"dropdown","text":"Type of property","path":"ClaimFile.Contract.typeOfProperty","value":null,"minLength":null,"maxLength":null,"choices":{"HOUSE":"House","FLAT":"Flat"},"mandatory":true}]}}],"links":{"self":{"href":"/app_dev.php/forms/v1/claimFile/FR11P00000000/Contract"}},"jsonapi":{"version":"1.0"}}`;
	}
	else if (req.body.context === 'ClaimInformation') {
		json = `{"data":[{"type":"default","attributes":{"name":"default","fields":[{"id":"9c81fed8-9c5b-11e6-9d19-525400bd971e","name":"eventType","label":"event type","type":"dropdown","text":"event type","path":"ClaimFile.ClaimInformation.eventType","value":null,"minLength":null,"maxLength":null,"choices":{"UNKNOWN_FIRE":"Unknown fire","FIRE_HUMAN_INTERVENATION":"Fire - Human intervention","FIRE_ELECTRICAL_INSTALLATION":"Fire - Electrical installation","FIRE_HOME_ACCESSORY":"Fire - Home accessory","FIRE_VANDALISM_EXPLOSION":"Fire - Vandalism - Explosion","FIRE_NATURAL_EVENT":"Fire - Natural event","LEAK_PIPE_RUPTURE":"Leak - Pipe rupture","INFILTRATION":"Infitration","OVERTHROW":"Overthrow","THEFT_BREAKING_IN":"Theft - Breaking in","THEFT_WITHOUT_BREAKING_IN":"Theft - Without Breaking in","THEFT":"Theft","ACCIDENTAL":"Accidental"},"mandatory":true},{"id":"9c8232e9-9c5b-11e6-9d19-525400bd971e","name":"claimNumber","label":"Claim's number (create in IT system)","type":"integer","text":"Claim's number (create in IT system)","path":"ClaimFile.ClaimInformation.claimNumber","value":null,"minLength":null,"maxLength":"16","choices":null,"mandatory":null},{"id":"9c825c51-9c5b-11e6-9d19-525400bd971e","name":"dateOfLoss","label":"Date of loss","type":"date","text":"Date of loss","path":"ClaimFile.ClaimInformation.dateOfLoss","value":"2011-09-28","minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"9c8286fe-9c5b-11e6-9d19-525400bd971e","name":"declarationDate","label":"Declaration date","type":"date","text":"Declaration date","path":"ClaimFile.ClaimInformation.declarationDate","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"9c82b71b-9c5b-11e6-9d19-525400bd971e","name":"lastStatusOfClaim","label":"last status of claim","type":"text","text":"last status of claim","path":"ClaimFile.ClaimInformation.lastStatusOfClaim","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"9c82e7bf-9c5b-11e6-9d19-525400bd971e","name":"coverage","label":"coverage","type":"dropdown","text":"coverage","path":"ClaimFile.ClaimInformation.coverage","value":null,"minLength":null,"maxLength":null,"choices":{"THEFT":"Theft"},"mandatory":true},{"id":"9c8320f2-9c5b-11e6-9d19-525400bd971e","name":"addressOfLoss","label":"address of loss","type":"text","text":"address of loss","path":"ClaimFile.ClaimInformation.addressOfLoss","value":null,"minLength":null,"maxLength":null,"choices":null,"mandatory":true},{"id":"9c8355b3-9c5b-11e6-9d19-525400bd971e","name":"zipCodeOfLoss","label":"Zip code of loss","type":"text","text":"Zip code of loss","path":"ClaimFile.ClaimInformation.zipCodeOfLoss","value":null,"minLength":null,"maxLength":"5","choices":null,"mandatory":true},{"id":"9c8389c5-9c5b-11e6-9d19-525400bd971e","name":"townOfLoss","label":"Town of loss","type":"text","text":"Town of loss","path":"ClaimFile.ClaimInformation.townOfLoss","value":null,"minLength":null,"maxLength":"15","choices":null,"mandatory":true},{"id":"9c83c33c-9c5b-11e6-9d19-525400bd971e","name":"descriptionOfDamage","label":"Description of damage","type":"text_area","text":"Description of damage","path":"ClaimFile.ClaimInformation.descriptionOfDamage","value":null,"minLength":null,"maxLength":"80","choices":null,"mandatory":true},{"id":"9c83fd31-9c5b-11e6-9d19-525400bd971e","name":"damageType","label":"Damage type/category","type":"dropdown","text":"Damage type/category","path":"ClaimFile.ClaimInformation.damageType","value":null,"minLength":null,"maxLength":null,"choices":{"PROPERTY":"Property","MOVABLE_PROPERTY":"Movable Property"},"mandatory":true}]}}],"links":{"self":{"href":"/app_dev.php/forms/v1/claimFile/FR11P00000000/ClaimInformation"}},"jsonapi":{"version":"1.0"}}`;
	}
	else if (req.body.context === 'DescriptionOfRisk') {
		json = `{"data":[{"type":"Risk","attributes":{"name":"Risk","fields":[{"id":"7ce64b49-b0d4-11e6-857d-5254007c4f9a","name":"typeOfProperty","label":"Type of property","type":"dropdown","text":"Type of property","path":"ClaimFile.DescriptionOfRisk.typeOfProperty","value":"House","minLength":null,"maxLength":null,"choices":{"HOUSE":"House","FLAT":"Flat"},"mandatory":true,"rank":1},{"id":"7ce7eb05-b0d4-11e6-857d-5254007c4f9a","name":"numberOfRooms","label":"Number of rooms","type":"integer","text":"Number of rooms","path":"ClaimFile.DescriptionOfRisk.numberOfRooms","value":"6","minLength":null,"maxLength":"3","choices":null,"mandatory":true,"rank":2},{"id":"7cea379a-b0d4-11e6-857d-5254007c4f9a","name":"totalSize","label":"Total size","type":"text","text":"Total size","path":"ClaimFile.DescriptionOfRisk.totalSize","value":"84","minLength":null,"maxLength":"6","choices":null,"mandatory":true,"rank":3},{"id":"7ced164f-b0d4-11e6-857d-5254007c4f9a","name":"ageOfHousing","label":"Age of housing","type":"text","text":"Age of housing","path":"ClaimFile.DescriptionOfRisk.ageOfHousing","value":null,"minLength":null,"maxLength":"10","choices":null,"mandatory":true,"rank":4}]}}],"links":{"self":{"href":"/app_dev.php/forms/v1/claimFile/FR70P90000000/DescriptionOfRisk?access_token=Y2Y0YjdkZjA3OGFmOWIwZjQ2YTdhNjcyMmQzZTczNjkzY2ZkYzFjMDQ3NDBmZWI3YmIxMDczM2U3MDZkNTE3Nw"}},"jsonapi":{"version":"1.0"}}`;
	}

	body = JSON.parse(json);
	
	res.send(body);
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

		// Form part submission returns a complete updated claimfile
		if (req.method === 'POST') {
			let json = `{"data":[{"type":"claimFile","id":"FR11P00000000","attributes":{"wan":"FR11P00000000","wanType":"R","customerInformation":{"customerName":"Nadine Morano","customerNumber":"213542","policyNumber":"213542"},"contract":{"contractNumber":"213542"},"claimInformation":{"dateOfLoss":"2011-09-28","dateOfEvent":"2011-09-28"},"descriptionOfRisk":[],"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"215343","createdAt":"2016-10-27 15:47:08","updatedAt":"2016-11-03 17:45:31","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":""}},{"type":"claimFile","id":"FR40P90000000","attributes":{"wan":"FR40P90000000","wanType":"T","customerInformation":{"customerName":"Mark","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"4","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0003","customerOrigin":"FR0003"}},{"type":"claimFile","id":"FR50P90000000","attributes":{"wan":"FR50P90000000","wanType":"T","customerInformation":{"customerName":"Philippe","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"3","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0002","customerOrigin":"FR0002"}},{"type":"claimFile","id":"FR60P90000000","attributes":{"wan":"FR60P90000000","wanType":"T","customerInformation":{"customerName":"Jean","customerNumber":"201","policyNumber":"101"},"contract":{"contractNumber":"201"},"claimInformation":{"claimNumber":"2","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"apartment","numberOfRooms":"2","totalSize":"45"},"status":{"name":"COVERAGE_CHECKED"},"insurerExternalClaimFileId":"201","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":"FR0001"}},{"type":"claimFile","id":"FR70P90000000","attributes":{"wan":"FR70P90000000","wanType":"L","customerInformation":{"customerNumber":"101","customerName":"Dupont","policyNumber":"101"},"contract":{"contractNumber":"101"},"claimInformation":{"claimNumber":"1","dateOfLoss":"2016-01-01 08:00:00"},"descriptionOfRisk":{"typeOfProperty":"House","numberOfRooms":"6","totalSize":"84"},"status":{"name":"PRE_NOTIFICATION_DONE"},"insurerExternalClaimFileId":"101","createdAt":"2016-01-01 08:00:00","updatedAt":"2016-01-01 08:00:00","closed":"0","closingDate":"","customer":"FR0001","customerOrigin":"FR0001"}}],"links":{"self":{"href":""}}}`;

			let body = JSON.parse(json);
		}
		
		res.send(body);
	}

});

/**
 * Get list of coverages
 */
app.get('/coverages', (req, res) => {
	let json = `{"meta":{"total_count":12},"data":[{"type":"coverage","attributes":{"type":"TYPE_WATER_DAMAGE","name":"Water damage","rank":1}},{"type":"coverage","attributes":{"type":"TYPE_THEFT","name":"Theft","rank":2}},{"type":"coverage","attributes":{"type":"TYPE_ELECTRICAL_DAMAGE","name":"Electrical damage","rank":3}},{"type":"coverage","attributes":{"type":"TYPE_GLASS_BREAKAGE","name":"Glass breakage","rank":4}},{"type":"coverage","attributes":{"type":"TYPE_FIRE","name":"Fire","rank":5}},{"type":"coverage","attributes":{"type":"TYPE_FROST","name":"Frost","rank":6}},{"type":"coverage","attributes":{"type":"TYPE_STORM","name":"Storm","rank":7}},{"type":"coverage","attributes":{"type":"TYPE_HAIL","name":"Hail","rank":8}},{"type":"coverage","attributes":{"type":"TYPE_HIT_BY_GROUND_VEHICULE","name":"Hit by ground vehicule","rank":9}},{"type":"coverage","attributes":{"type":"TYPE_MACHINE_BREAKING","name":"Machine breaking","rank":10}},{"type":"coverage","attributes":{"type":"TYPE_VANDALISM","name":"Vandalism","rank":11}},{"type":"coverage","attributes":{"type":"TYPE_NATURAL_DISASTER","name":"Natural disaster","rank":12}}],"links":{"self":"\/app_dev.php\/coverages\/v1\/?access_token=Yzg3YTdjZDcxNThjMTRmNzkwZDYxOGEyZmM2NTFhODVhZjM1NTMyMjRhYzY5OTFmOTM4ZjMxMmEyYzg2NzdmOQ","first":"\/app_dev.php\/coverages\/v1\/?page[number]=1","prev":null,"next":"\/app_dev.php\/coverages\/v1\/?page[number]=1","last":"\/app_dev.php\/coverages\/v1\/?page[number]=12"},"jsonapi":{"version":"1.0"}}`;

	let body = JSON.parse(json);

	res.send(body);
});

/**
 * Get steps
 */
app.get('/steps', (req, res) => {	
	let json = `{"data":[{"type":"step","id":"REPORT_OPENING","attributes":{"id":"REPORT_OPENING","name":"REPORT_OPENING","label":"Report opening","rank":1}},{"type":"step","id":"VALIDATE_CONTRACT","attributes":{"id":"VALIDATE_CONTRACT","name":"VALIDATE_CONTRACT","label":"Validate contract","rank":2}},{"type":"step","id":"COVERAGE_CHECKING","attributes":{"id":"COVERAGE_CHECKING","name":"COVERAGE_CHECKING","label":"Coverage checking","rank":3}},{"type":"step","id":"DAMAGE_EVALUATION","attributes":{"id":"DAMAGE_EVALUATION","name":"DAMAGE_EVALUATION","label":"Damage evaluation","rank":4}},{"type":"step","id":"INDEMNITIES_CALCULATE","attributes":{"id":"INDEMNITIES_CALCULATE","name":"INDEMNITIES_CALCULATE","label":"Indemnities calculate","rank":5}},{"type":"step","id":"REPAIR","attributes":{"id":"REPAIR","name":"REPAIR","label":"Repair","rank":6}},{"type":"step","id":"EXPERTISE","attributes":{"id":"EXPERTISE","name":"EXPERTISE","label":"Expertise","rank":7}},{"type":"step","id":"LOSS_SETTLEMENT","attributes":{"id":"LOSS_SETTLEMENT","name":"LOSS_SETTLEMENT","label":"Loss settlement","rank":8}},{"type":"step","id":"CLOSING","attributes":{"id":"CLOSING","name":"CLOSING","label":"Closing","rank":9}}],"links":{"self":{"href":"/app_dev.php/steps/v1/?access_token=Y2Y0YjdkZjA3OGFmOWIwZjQ2YTdhNjcyMmQzZTczNjkzY2ZkYzFjMDQ3NDBmZWI3YmIxMDczM2U3MDZkNTE3Nw"}},"jsonapi":{"version":"1.0"}}`;
	let body = JSON.parse(json);

	res.send(body);
});

/**
 * Get claim file summary
 * Real route : GET http://192.168.33.10:22201/app_dev.php/claimFiles/v1/summary/FR40P90000000?access_token=...
 */
app.get('/summary', (req, res) => {
	let json = `{"data":{"type":"summaryInformation","id":"FR40P90000000","attributes":{"summaryInformationClaim":{"name":"Claim","value":"4"},"summaryInformationCnt":{"name":"Insurance","value":""},"summaryInformationInsured":{"name":"Insured","value":"Mark"},"summaryInformationEvt":{"name":"Evt","value":null},"summaryInformationProduct":{"name":"Product","value":null},"summaryInformationDamage":{"name":"Damage","value":"2016-01-01 08:00:00"}}},"links":{"self":{"href":"\/app_dev.php\/claimFiles\/v1\/summary\/FR40P90000000?access_token=Yzg3YTdjZDcxNThjMTRmNzkwZDYxOGEyZmM2NTFhODVhZjM1NTMyMjRhYzY5OTFmOTM4ZjMxMmEyYzg2NzdmOQ"}},"jsonapi":{"version":"1.0"}}`;

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