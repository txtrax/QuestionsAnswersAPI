require('dotenv').config();
const express = require('express');
const path = require('path');
const controllers = require('./controllers/index.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// ROUTES
app.get('/qa/questions', controllers.question.getQuestions);
// app.get('/qa/questions/:question_id/answers', controller.getAnswers); //answers included in above call

app.post('/qa/questions', controllers.question.addQuestion);
app.post('/qa/questions/:question_id/answers', controllers.answer.addAnswer);

// add 4 app.put() but client doesnt account for

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}!`);
});
