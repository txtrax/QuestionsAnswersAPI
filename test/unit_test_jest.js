require('dotenv').config();
const express = require("express");
const { Pool } = require('pg');
let request = require("supertest");
request = request('http://localhost:3001');

// this uses jest with supertest
const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
});

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Connected to database ${pool.database}`);
  };
});
