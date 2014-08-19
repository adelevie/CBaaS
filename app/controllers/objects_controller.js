var express = require('express');
var objectsController = express.Router();
var _ = require('underscore');

// load helpers
var helpers = require('../helpers');
var requestIsQuery = helpers.requestIsQuery;
var formatObject = helpers.formatObject;
var handleError = helpers.handleError;

// get the Object model
var models = {};  // shim to protect the namespace
models.Object = require('../../app/models/object');

objectsController.route('/:className')
  .post(function(req, res) {
    var obj = new models.Object(req.body);
    obj.className = req.params.className;
    obj.save(function(err) {
      if (err) return handleError(err, res);
      
      var newObj = formatObject(obj);
      res.json(_.pick(newObj, 'createdAt', 'objectId'));
    });
  })
  
  .get(function(req, res) {
    var queryParams = {
      className: req.params.className
    };
    
    // if `where` is in get string, it's a db query;
    // so we parse out the query constraints,
    // and add them to queryParams
    if (requestIsQuery(req)) {
      var params = req.query.where;
      
      var parsed;
      try {
        parsed = JSON.parse(params);
      } catch (e) {
        handleError({name: 'JSONParseError', error: 'The server could not parse the supplied JSON in the \'where\' queryparam.'}, res);
      }
      
      // combine queryParams and parsed
      // source: http://stackoverflow.com/a/171256/94154
      for (var attrname in parsed) { queryParams[attrname] = parsed[attrname]; }      
    } 

    models.Object.find(queryParams, function(err, objs) {
      if (err) return handleError(err, res);
      var response = _.map(objs, formatObject);
    
      res.json(response);
    });

  });
  
objectsController.route('/:className/:objectId')
  .get(function(req, res) {
    var params = {
      className: req.params.className,
      _id: req.params.objectId
    };
    models.Object.findOne(params, function(err, obj) {
      if (err) return handleError(err, res);
    
      res.json(
        formatObject(obj)
      );
    });
  })

  .put(function(req, res) {
    var params = {
      _id: req.params.objectId
    };
    var body = req.body;
    if (body.className) {
      return handleError({name: "ImmutabilityError"}, res);
    }
    delete body.className;
  
    models.Object.findByIdAndUpdate(params, req.body, function(err, obj) {
      if (err) return handleError(err, res);
      
      res.json(
        formatObject(obj)
      );
    });
  })

  .delete(function(req, res) {
    models.Object.remove({
      _id: req.params.objectId
    }, function(err, obj) {
      if (err) return handleError(err, res);
      
      res.json({message: 'Succesfully deleted.'});
    });
  });
  
module.exports = objectsController;