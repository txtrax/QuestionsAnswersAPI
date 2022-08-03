const models = require('../models/index.js');

module.exports = {
  getQuestions: function(req, res) {
    let product_id = Number(req.query.product_id);
    const page = Number(req.query.page) || 1;
    const count = Number(req.query.count) || 5;

    models.question.getQuestions({
      product_id, page, count
    })
      // format results
      .then((results) => {
        return {
          product_id: product_id.toString(),
          results: results.rows
        };
      })
      // change photo and date values
      .then((data) => {
        data.results.forEach((question) => {
          question.question_date = new Date(Number(question.question_date)).toISOString();

          for (var key in question.answers) {
            question.answers[key].date = new Date(Number(question.answers[key].date)).toISOString();

            if (question.answers[key].photos === null) {
              question.answers[key].photos = [];
            };
          };
        });
        res.status(200).send(data);
      })

      .catch((err) => {
        // console.log(err.stack);
        res.sendStatus(500);
      });
  },

  addQuestion: function(req, res) {
    let newInfo = {
      question_body: req.body.body,
      asker_name: req.body.name,
      asker_email: req.body.email,
      product_id: req.body.product_id
    };

    models.question.addQuestion(newInfo)
      .then((results) => {
        // client side expecting updated info from db
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
