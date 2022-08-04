DROP DATABASE IF EXISTS QnA_pg;

CREATE DATABASE QnA_pg;

DROP TABLE IF EXISTS questions, answers, photos;

------------------------------------------------------------------------------------------

CREATE TABLE questions (
  question_id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  question_body VARCHAR(500) NOT NULL,
  question_date BIGINT NOT NULL,
  asker_name VARCHAR(50) NOT NULL,
  asker_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  question_helpfulness INTEGER DEFAULT 0
);

CREATE TABLE answers (
  id SERIAL NOT NULL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  body VARCHAR(500) NOT NULL,
  date BIGINT NOT NULL,
  answerer_name VARCHAR(50) NOT NULL,
  answerer_email VARCHAR(50) NOT NULL,
  reported BOOLEAN NOT NULL DEFAULT false,
  helpfulness INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions (question_id)
);

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  answer_id INTEGER NOT NULL,
  url TEXT NOT NULL,
  FOREIGN KEY (answer_id) REFERENCES answers (id)
);

------------------------------------------------------------------------------------------

\COPY questions FROM '/Users/bikwon/Desktop/exampleData/questions.csv' DELIMITER ',' CSV HEADER;
\COPY answers FROM '/Users/bikwon/Desktop/exampleData/answers.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM '/Users/bikwon/Desktop/exampleData/answers_photos.csv' DELIMITER ',' CSV HEADER;

------------------------------------------------------------------------------------------

SELECT pg_catalog.setval(pg_get_serial_sequence('questions', 'question_id'), MAX(question_id)) FROM questions;
SELECT pg_catalog.setval(pg_get_serial_sequence('answers', 'id'), MAX(id)) FROM answers;
SELECT pg_catalog.setval(pg_get_serial_sequence('photos', 'id'), MAX(id)) FROM photos;

------------------------------------------------------------------------------------------

CREATE INDEX product_id ON questions (product_id);
CREATE INDEX question_id ON answers (question_id);
CREATE INDEX answer_id ON photos (answer_id);

-- dropdb QnA_pg
-- createdb QnA_pg

-- psql QnA_pg < server/db/schema.sql
-- OR
-- psql QnA_pg
-- \i server/db/schema.sql
-- \l pslist all databases in postgresql
-- \c move into database
-- \q quit
-- \! clear -- to clear console