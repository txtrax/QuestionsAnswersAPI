DROP TABLE IF EXIST `Questions`;

CREATE TABLE `Questions` (
  `question_id` SERIAL PRIMARY KEY,
  `question_body` TEXT NOT NULL,
  `question_date` TEXT NOT NULL,
  `asker_name` TEXT NOT NULL,
  `asker_email` TEXT NOT NULL,
  `question_helpfulness` INTEGER NOT NULL,
  `reported` BOOLEAN NOT NULL,
  `product_id` INTEGER NOT NULL,
);

DROP TABLE IF EXIST `Answers`;

CREATE TABLE `Answers` (
  `id` SERIAL PRIMARY KEY,
  `body` TEXT NOT NULL,
  `date` TEXT NOT NULL,
  `answerer_name` TEXT NOT NULL,
  `answerer_email` TEXT NOT NULL,
  `helpfulness` INTEGER NOT NULL,
  `reported` BOOLEAN NOT NULL,
  `question_id` INTEGER REFERENCES `Questions` (`question_id`);
);

DROP TABLE IF EXIST `Photos`;

CREATE TABLE `Photos` (
  `id` SERIAL PRIMARY KEY,
  `url` TEXT NOT NULL,
  `answer_id` INTEGER REFERENCES `Answers` (`id`);
);

copy questions from 'Users/bikwon/Desktop/questions.csv' delimiter ',' cvs header;
copy answers from 'Users/bikwon/Desktop/answers.csv' delimiter ',' cvs header;
copy answers_photos from 'Users/bikwon/Desktop/answers_photos.csv' delimiter ',' cvs header;