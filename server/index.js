require('dotenv').config();

const express = require('express');
const controllers = require('./controllers/index.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/qa/questions', controllers.question.getQuestions);

// app.get('/qa/questions/:question_id/answers', controller.getAnswers); //answers included in getQuestions

app.post('/qa/questions', controllers.question.addQuestion);

app.post('/qa/questions/:question_id/answers', controllers.answer.addAnswer);

app.put('/qa/questions/:question_id/helpful', controllers.question.updateHelpful);

app.put('/qa/questions/:question_id/report', controllers.question.report);

// app.put('/qa/answers/:answer_id/helpful', controllers.answer.updateHelpful);

// app.put('/qa/answers/:answer_id/report', controllers.answer.report);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}!`);
});
