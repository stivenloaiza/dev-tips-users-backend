<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

###Dev Tips Users Backend
Description

This project handles the user part, managing user registration and subscriptions. Data is stored in the database and shared with other microservices as needed. Endpoints are created for other microservices to consume and utilize this data.
Versions

    Node.js: v20.11.10

###Step-by-Step###

    Clone the Repository

    bash

git clone https://github.com/stivenloaiza/dev-tips-users-backend.git

Navigate to the Folder

bash

cd dev-tips-users-backend

Install Dependencies

bash

npm install

Environment Variables

Create a .env file in the project root and add the following variables:


PORT=3000

MONGODB_USER=silenceisbeautyofsoul
MONGODB_PASSWORD=BqCDS2d2wjaHH1uu
MONGODB_CLUSTER=efnizvz.mongodb.net
MONGODB_DBNAME=riwi-tips-users


###Project Structure###

The project is organized in a modular structure:


src/
├── auth/
├── enums/
├── guard/
├── persistence/
├── module/
│   ├── bots/
│   ├── email/
│   ├── iframes/
│   ├── tvs/
│   └── users/
├── app.module.ts
└── main.ts
test/
.env.example

###Contributing###

To contribute to the project, follow these steps:

    Create a branch for each major task you want to perform.
    Make your changes and push them to the corresponding branch.
    Create a Pull Request. Do not push to the main branch until permitted by the Team Leader or Project Lead.

MongoDB Connection String Example

The complete MongoDB connection URL would look like this:

bash

mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_CLUSTER}/

Example Environment Variables

plaintext

MONGODB_USER=your_username
MONGODB_PASSWORD=your_password
MONGODB_CLUSTER=your_cluster.mongodb.net
MONGODB_DBNAME=your_database_name
PORT=3000

JIRA DOCUMENTATION 
https://miguelangeltabarescuadros.atlassian.net/jira/software/projects/URT/boards/3?atlOrigin=eyJpIjoiNmQzZWYyNzg1NTZjNDliZTg1NDQ4ZTUxNzNkMzMwMmQiLCJwIjoiaiJ9

CONFLUENCE DOCUMENTATION 
https://miguelangeltabarescuadros.atlassian.net/l/cp/PzJrNHiE



License

Nest is MIT licensed.
Contact

    Thomas Restrepo - thomasrr29@gmail.com
    Luisa Perez
    Juan Jaramillo

This README provides an overview of setting up and contributing to the dev-tips-users-backend project, including its structure, dependencies, and contribution guidelines.
