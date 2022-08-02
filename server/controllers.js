const model = require('./models.js');

module.exports = {
  // need to account for page and count
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
        let data = {
          product_id: product_id.toString(),
          results: results.rows
        }
        // change photo value from null to []
        data.results.forEach((question) => {
          for (var key in question.answers) {
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

  getAnswers: function(req, res) {
    console.log('inside get answers')
    res.end();
  }
}
