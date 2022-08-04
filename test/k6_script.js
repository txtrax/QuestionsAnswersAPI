import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s'
};

export default function () {
  const newQuestion = {
    body: "How will this look on me after KBBQ tho?",
    name: "Lola",
    email: "none-ya-bizniz@gmail.com",
    product_id: Math.floor(Math.random() * 1000000)
  };

  let newAnswer = {
    body: "Girl, you on fleek!",
    name: "BB8",
    email: "none-ya-beebeezwax@gmail.com",
    photos: []
  };

  if (Math.random() < 0.25) {
    newAnswer.photos = ['https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80', 'https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80']
  };

  http.get(`http://127.0.0.1:3001/qa/questions?product_id=${Math.floor(Math.random() * 1000000)}`);
  http.get(`http://127.0.0.1:3001/qa/questions/${Math.floor(Math.random() * 1000000)}/answers?page=1&count=5`);

  http.post(`http://127.0.0.1:3001/qa/questions`, JSON.stringify(newQuestion), {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  http.post(`http://127.0.0.1:3001/qa/questions/${Math.floor(Math.random() * 1000000)}/answers`, JSON.stringify(newAnswer), {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  http.put(`http://127.0.0.1:3001/qa/questions/${Math.floor(Math.random() * 1000000)}/helpful`);
  http.put(`http://127.0.0.1:3001/qa/questions/${Math.floor(Math.random() * 1000000)}/report`);
  http.put(`http://127.0.0.1:3001/qa/answers/${Math.floor(Math.random() * 1000000)}/helpful`);
  http.put(`http://127.0.0.1:3001/qa/answers/${Math.floor(Math.random() * 1000000)}/report`);
  sleep(1);
}
