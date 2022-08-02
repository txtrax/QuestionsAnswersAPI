const pool = require('../db/index.js');

module.exports = {
  addAnswer: function(obj) {
    const {
      question_id, body, answerer_name, answerer_email
    } = obj;
    const date = Math.floor(new Date().getTime());

    let text = `INSERT INTO answers(question_id, body, date, answerer_name, answerer_email) VALUES ($1, $2, $3, $4, $5)`
    let values = [question_id, body, date, answerer_name, answerer_email]

    return pool.query(text, values);
  }
}
