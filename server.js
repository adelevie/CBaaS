var express = require('express');
var app = require('./config');
var router = express.Router();

objectsController = require('./app/controllers/objects_controller');
router.use('/classes', objectsController);

var version = 1;
app.use('/'+version, router);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('The API server is listening on port ' + port);
