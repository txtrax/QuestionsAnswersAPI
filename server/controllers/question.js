const models = require('../models/index.js');

module.exports = {

  getQuestions: function(req, res) {
    const page = Number(req.query.page) || 1;
    const count = Number(req.query.count) || 5;
    let product_id = Number(req.query.product_id);

    models.question.getQuestions({
      page, count, product_id
    })
      .then((results) => {
        return {
          product_id: product_id.toString(),
          results: results.rows
        };
      })

      .then((data) => {
        data.results.forEach((question) => {
          question.question_date = new Date(Number(question.question_date)).toISOString();

          for (let key in question.answers) {
            question.answers[key].date = new Date(Number(question.answers[key].date)).toISOString();

            if (question.answers[key].photos === null) {
              question.answers[key].photos = [];
            };
          };
        });
        res.status(200).send(data);
      })

      .catch((err) => {
        res.sendStatus(500);
      });
  },

  addQuestion: function(req, res) {
    const newInfo = {
      question_body: req.body.body,
      asker_name: req.body.name,
      asker_email: req.body.email,
      product_id: req.body.product_id
    };

    models.question.addQuestion(newInfo)
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },

  updateHelpful: function (req, res) {
    models.question.updateHelpful(req.params.question_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },

  report: function (req, res) {
    models.question.report(req.params.question_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  }

};
