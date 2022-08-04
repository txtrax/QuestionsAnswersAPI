const pool = require('../db/index.js');
const format = require('pg-format');

module.exports = {

  addPhoto: function(answer_id, photos) {
    let text = `INSERT INTO photos(answer_id, url) VALUES %L;`;
    let values = [];

    photos.forEach((url) => {
      values.push([answer_id, url])
    });

    return pool.query(format(text, values));
  }

};
