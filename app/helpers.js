var _ = require('underscore');

// inspects the error,
// figures out what the http status code should be,
// sets the code, and returns some json.
// reference: http://en.wikipedia.org/wiki/List_of_HTTP_status_codes
var handleError = function(err, res) {
  // default error code
  var code = 400;
  
  // CastError might be too eager in that it 
  // could apply when other error codes are appropriate.
  if (err.name == 'CastError')
    code = 400;
    
  if (err.name == 'JSONParseError')
    code = 400;
    
  if (err.name == 'ImmutabilityError')
    code = 400;
    
  return res.status(code).json({error: err});
};

// takes a Mongoose object and adds/removes attributes 
// for human/api consumption.
// e.g. _id becomes objectId and className is removed.
var formatObject = function(obj) {
  var newObj = obj.toObject();    // make a copy
  newObj['objectId'] = obj._id;   // get the id before we omit it
  
  return _.omit(newObj, '_id', 'className', '__v');
};

var requestIsQuery = function(req) {
  if (req.query.where) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  handleError: handleError,
  formatObject: formatObject,
  requestIsQuery: requestIsQuery
};