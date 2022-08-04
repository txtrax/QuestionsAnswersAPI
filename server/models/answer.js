const pool = require('../db/index.js');

module.exports = {

  getAnswers: function({ question_id, page, count }) {
    let text = `
      SELECT answers.id, answers.body, answers.date, answers.answerer_name, answers.helpfulness,
        (SELECT (array_agg(json_build_object('id', photos.id, 'url', photos.url)))
        FROM photos
        WHERE answers.id = photos.answer_id)
      AS photos
      FROM answers
      WHERE question_id=$1 AND reported = false
    `;
    let offset = (page - 1) * count;
    let values = [question_id];

    return pool.query(text, values);
  },

  addAnswer: function(obj) {
    const {
      question_id, body, answerer_name, answerer_email
    } = obj;

    let text = `INSERT INTO answers(question_id, body, date, answerer_name, answerer_email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`;
    let date = Math.floor(new Date().getTime());
    let values = [question_id, body, date, answerer_name, answerer_email];
    return pool.query(text, values);
  },

  updateHelpful: function(answer_id) {
    let text = `UPDATE answers SET helpfulness=helpfulness + 1 WHERE id=$1`;
    let values = [answer_id];

    return pool.query(text, values);
  },

  report: function (answer_id) {
    let text = `UPDATE answers SET reported=true WHERE id=$1`;
    let values = [answer_id];

    return pool.query(text, values);
  }

};
