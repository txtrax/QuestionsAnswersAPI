const pool = require('../db/index.js');

module.exports = {
  getQuestions: function({product_id, page, count}) {
    // getQuestions still needs to account for page and count
    // need ordered by most recent, most helpful?
    let offset = (page - 1) * count;
    let text = `
      SELECT questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.question_helpfulness, questions.reported,
        (SELECT (json_object_agg(answers.id, json_build_object('id', answers.id, 'body', answers.body, 'date', answers.date, 'answerer_name', answers.answerer_name, 'helpfulness', answers.helpfulness, 'photos',
          (SELECT (array_agg(json_build_object('id', photos.id, 'url', photos.url)))
          FROM photos
          WHERE answers.id = photos.answer_id))))
        FROM answers
        WHERE questions.question_id = answers.question_id AND reported = false)
      AS answers
      FROM questions
      WHERE product_id=$1 AND reported = false
    `;
    // LIMIT $2
    // OFFSET $3`;
    let values = [product_id];

    return pool.query(text, values);
  },

  addQuestion: function(body) {
    const {
      product_id, question_body, asker_name, asker_email
    } = body;
    const date = Math.floor(new Date().getTime());

    let text = `INSERT INTO questions(product_id, question_body, question_date, asker_name, asker_email) VALUES ($1, $2, $3, $4, $5)`
    let values = [product_id, question_body, date, asker_name, asker_email]

    return pool.query(text, values);
  },

  updateHelpful: function(question_id) {
    let text = `UPDATE questions
      SET question_helpfulness = question_helpfulness + 1
      WHERE question_id=$1`;
    let values = [question_id];

    return pool.query(text, values);
  },

  report: function (question_id) {
    let text = `UPDATE questions
      SET reported=true
      WHERE question_id=$1`;
    let values = [question_id];

    return pool.query(text, values);
  }
};
