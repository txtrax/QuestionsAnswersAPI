# QuestionsAnswersAPI
<div align="center" width="100%">
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" />
</div>

## Overview
This is the Back-End-Capstone project and API design, specifically created for the Question and Answers Component of an e-Commerce webiste. The goal was to revamp the backend-oriented, monolithic API into microservices that can support 1000+ requests per second (RPS) with 2-seconds average response time and less than 1% network error rate.

Application includes:

 - 8 API routes to handle Front-End CRUD operations
 - DB schema for questions and answers as well as their respective photos
 - JSON aggregate functions and indexing to improve query times
 - ETL to combine, cleanse and input the data into a PostgreSQL DB
 - Stress Test Tool -> k6
 
Deployment includes:

 - 1 AWS EC2 instance of the PostgreSQL DB
 - 2 AWS EC2 microservices
 - 1 NGINX Load Balancer
 - Stress Test Tool -> Loader.io

## Results 

A redesigned, horizontally scaled microservice-oriented API that can a handle load capacity of up to 2500 RPS at latency rate of 100ms with 0% error rate.
