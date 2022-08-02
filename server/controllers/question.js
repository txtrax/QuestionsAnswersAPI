const model = require('../models/models.js');

module.exports = {
  // getQuestions still needs to account for page and count
  getQuestions: function(req, res) {
    let {
      product_id, page, count
    } = req.query;

    product_id = Number(product_id);
    page = Number(page) || 1;
    count = Number(count) || 5;

    model.getQuestions({
      product_id, page, count
    })
      .then((results) => {
        // format results
        let data = {
          product_id: product_id.toString(),
          results: results.rows
        }
        // change photo and date value
        data.results.forEach((question) => {
          question.question_date = new Date(Number(question.question_date)).toISOString();

          for (var key in question.answers) {
            question.answers[key].date = new Date(Number(question.answers[key].date)).toISOString();

            if (question.answers[key].photos === null) {
              question.answers[key].photos = [];
            }
          }
        })
        res.status(200).send(data);
      })

      .catch((err) => {
        console.log(err.stack);
        res.sendStatus(500);
      })
  },

  addQuestion: function(req, res) {
    let newInfo = {
      question_body: req.body.body,
      asker_name: req.body.name,
      asker_email: req.body.email,
      product_id: req.body.product_id
    }

    model.addQuestion(newInfo)
      .then((results) => {
        // send back info posted question_id, helpful, and reported
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      })
  }
}
