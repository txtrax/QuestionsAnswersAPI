import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s'
};

export default function () {
  const params = {
    body: "How will this look on me after KBBQ tho?",
    name: "Theresa",
    email: "none-ya-bizniz@gmail.com",
    product_id: Math.floor(Math.random() * 1000000)
  }

  http.post(`http://localhost:3001/qa/questions`, JSON.stringify(params), {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  http.get(`http://localhost:3001/qa/questions?product_id=${Math.floor(Math.random() * 1000000)}`);
  // sleep(1);
}
