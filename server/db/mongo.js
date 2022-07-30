//require mongoose
const mongoose = require('mongoose');

// set up connection
mongoose.connect(`mongodb://localhost/${}`, {useNewUrlParser: true, useUnifiedTopology: true});

//schema blueprint
let questionSchema = mongoose.Schema({
  question_id: {type: Number, unique: true, required: true},
  question_body: String,
  question_date: String,
  asker_name: String,
  asker_email: String,
  question_helpfulness: Number,
  reported: Boolean,
  product_id: Number,
});

let answerSchema = mongoose.Schema({
  id: {type: Number, unique: true, required: true},
  body: String,
  date: String,
  answerer_name: String,
  answerer_email: String,
  helpfulness: Number,
  reported: Boolean,
  photos: [String],
  question_id: Number,
});


//make model with string name and give it blueprint
let Question = mongoose.model('Question', questionSchema);
let Answer = mongoose.model('Answer', answerSchema);