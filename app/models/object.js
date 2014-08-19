var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var ObjectSchema = new Schema({
  className: String
}, {
  strict: false
});

ObjectSchema.plugin(timestamps);
mongoose.model('Object', ObjectSchema);

module.exports = mongoose.model('Object', ObjectSchema);
