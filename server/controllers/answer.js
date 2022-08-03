const models = require('../models/index.js');

module.exports = {
  getAnswers: function(req, res) {
    let question_id = Number(req.params.question_id) ||1;
    const page = Number(req.query.page) ||1;
    const count = Number(req.query.count) ||5;

    models.answer.getAnswers({
      question_id, page, count
    })
      .then((results) => {
        return {
          question: question_id.toString(),
          page,
          count,
          results: results.rows
        }
      })
      .then((data) => {
        data.results.forEach((answer) => {
          answer.answer_id = answer.id;
          delete answer.id;

          answer.date = new Date(Number(answer.date)).toISOString();

          if (answer.photos === null) {
            answer.photos = [];
          }
        })
        res.status(200).send(data);
      })

      .catch((err) => {
        res.sendStatus(500);
      });
  },

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
      });
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
