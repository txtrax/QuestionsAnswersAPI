const pool = require('./db/index.js');

module.exports = {
  getQuestions: function({ product_id, page, count }) {
    let offset = (page - 1) * count;

    // add ordered by most recent, most helpful?
    // need offset?
    let text = `SELECT questions.question_id, questions.question_body, questions.question_date, questions.asker_name, questions.question_helpfulness, questions.reported,
      (SELECT (json_object_agg(answers.id, json_build_object('id', answers.id, 'body', answers.body, 'date', answers.date, 'answerer_name', answers.answerer_name, 'helpfulness', answers.helpfulness, 'photos',
        (SELECT (array_agg(json_build_object('id', photos.id, 'url', photos.url)))
        FROM photos
        WHERE answers.id = photos.answer_id))))
      FROM answers
      WHERE questions.question_id = answers.question_id)
      AS answers
    FROM questions
    WHERE product_id=$1 AND reported = false`;
    // DESC LIMIT $2
    // OFFSET $3`;
    let values = [product_id];

    return pool.query(text, values);
  }
}
