// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/scrapenewsdb");
autoIncrement.initialize(connection);
// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true,
    unique: true
  },
  // link is a required string
  link: {
    type: String,
    required: true,
    unique: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  },
   date: {
    type: Date,
    default: Date.now
  }
});

ArticleSchema.plugin(autoIncrement.plugin, {
  model: 'Article',
  field: "articleNumber",
  startAt: 1
});
// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;