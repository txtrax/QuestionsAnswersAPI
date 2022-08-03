const models = require('../models/index.js');

module.exports = {
  addAnswer: function(req, res) {
    // add photos?
    let newInfo = {
      body: req.body.body,
      answerer_name: req.body.name,
      answerer_email: req.body.email,
      question_id: req.params.question_id
    }

    models.answer.addAnswer(newInfo)
      .then((results) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      })
  },

  updateHelpful: function (req, res) {
    models.answer.updateHelpful(req.params.answer_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },

  report: function (req, res) {
    models.answer.report(req.params.answer_id)
      .then(results => {
        res.sendStatus(204);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  }
}
