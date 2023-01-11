# QuestionsAnswersAPI
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS](https://img.shields.io/badge/-AWS-232F3E?logo=amazonaws&logoColor=white&style=for-the-badge)
![NGINX](https://img.shields.io/badge/-NGINX-009639?logo=nginx&logoColor=white&style=for-the-badge)

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
