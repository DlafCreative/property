var path = require('path');
var express = require('express');
var app = express();

const { WEBSERVER_PORT } = require('../config/server.params.js');

app.set('port', WEBSERVER_PORT || 8080);

app.use ( express.static(path.join(__dirname, '../dist') ));

/** Redirect everything to index.html */
app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'));
});

app.listen(app.get('port'), function() {
    console.log(`Serveur Web demarré sur le port ${app.get('port')}, bravo !`);
});