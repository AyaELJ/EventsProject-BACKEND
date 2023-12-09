# 👩🏻‍💻👩🏻‍💻 AUTHORS 

Aya El Janoussi and Tonia El Khoury

# 📋 ABOUT THE DATASET

This dataset lists public events published in OpenAgenda agendas.

Dataset identifier : evenements-publics-openagenda
Downloads : 4 023
Subjects : Culture, Heritage, Sports, Leisure
Keywords : concert, theater, exhibition, fair, event, symposium, competition, meeting, art, sport
License : Open License v1.0
Language : French
Modified : December 9, 2023 17:12
Producer: OpenAgenda
Reference: https://openagenda.com/
Territory: World
Last processing : December 9, 2023 17:12 (metadata) / December 9, 2023 17:12 (data)

DCAT
Creator: OpenAgenda
Update frequency : Daily

# 🎯 CONTEXT AND GOAL

The primary goal of our project was to develop an application leveraging the API endpoint provided by OpenData platform to enable users to conveniently search for public events based on their preferences, locations, and the titles of the events. The application aims to allow users to explore and discover events that match their specific interests, preferred locations, by accessing, filtering, sorting, paginating and finding relevant public events, enhancing their event discovery experience and facilitating their participation in activities aligned with their preferences and geographical proximity.

# 📒 DESCRIPTION OF THE BACKEND

The backend is running on: https://events-aej-tek.cleverapps.io/events
We attached the postman collection in JSON format to know more about some of the requests that we used. In order to do that, follow these instructions: Go to postman -> file -> import -> upload Files and choose the collection provided in this repo to add it to postman.

Our ressource has a dto "Data Transfer Object" folder that contains all the dto and interfaces for the ressource. These dto are used to control how the data is received and sent from the API, a controller file which contains all the gateways that can be used to access the data related to the ressource, a service file that contains all the logic for the ressource, this is where reading, filtering, sorting, adding and deleting data is happening and a  module file in which the metadata is stored "imports, exports, providers, controller".

### 📄 event.interface

It defines the format of the event data that we will be working with:

| Property       |                  Description                  |   Type |
| :------------- | :-------------------------------------------: | -----: |
| id             |                id of the event                | string |
| title          |               title of the event              | string |
| description    |            description of the event           | string |
| longdescription|         long description of the event         | string |
| eventurl       |                url of the event               | string |
| imageurl       |         url of the image of the event         | string |
| keywords       |             keywords of the event             | string |
| timings        | dates of starting and finishing of the event  | string |
| latitude       |             latitude of the event             | number |
| longitude      |            longitude of the event             | number |
| address        |             address of the event              | string |
| city           |              city of the event                | string |
| department     |            department of the event            | string |
| region         |              region of the event              | string |
| country        |              country of the event             | string |
| attendancemode | attendance mode of the event(online, in-place)| string |
| phoneNumber    |           phoneNumber of the event            | string |
| email          |              email of the event               | string |
| website        |            website of the event               | string |
| favorite       |         favorite event(True or False)         | boolean|


### 📄 event.dto

This contains all the attributs existing in the event interface.



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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
