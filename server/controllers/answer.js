const model = require('../models/index.js');

module.exports = {
  addAnswer: function(req, res) {
    // add photos?
    let newInfo = {
      body: req.body.body,
      answerer_name: req.body.name,
      answerer_email: req.body.email,
      question_id: req.params.question_id
    }

    model.addAnswer(newInfo)
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
