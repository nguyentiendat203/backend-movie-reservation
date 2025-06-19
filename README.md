<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Build a Movie Reservation System allows users to books seats for a showtime.

## Features

### 🔐 User Authentication and Authorization (JWT).
✅ Register
- Users can register by providing email and password. Passwords are securely hashed before being stored in the database.

✅ Login
- Users log in with their email and password. If valid, the server returns:
  - access_token: short-lived token used to access protected APIs.
  - refresh_token: long-lived token used to obtain new access tokens.
- Refresh tokens are stored securely in the database and sent to the client.
- Admin could be able to delete user.
- Users could be able to their credentials.

🔄 Refresh Access Token
- Clients can send a valid refresh_token to receive a new access_token without re-entering credentials.

❌ Logout
- The refresh token is deleted from the database to log the user out securely.

🔑 Forgot Password
- Users can request a password reset by providing their email. A special access token is sent via email.

🔁 Reset Password
- Users provide a new password and valid token from email. If valid, the password is updated.

### 📺 Showtime Management.
- Admin could be able to create, update, delete and get all showtimes.
- User could be able to filter showtime by movie.
- User could be able to filter all seats belonging to a showitme.

### 🎬 Movie Management.
- Admin could be able to create, update and delete movies.
- Movies are categorized by genre.
- Users can view detailed information of the movie.
  
### 🧾 Reservation Management.
- Admin could be able to get all reservations.
- User could be able to reserve seats for a showtime, see the available seats and select the seats they want.
- Users could be able to see their reservations and cancel them (only upcoming ones).

### 💺 Seat Management.
- Admin could be able to update, delete and get all seats.
- User could be able to filter all seats belonging to a showitme.
- Implement avoid overbooking seats.

## Project setup

```bash
# Install dependencies
$ npm install

# Run docker container
$ docker compose up
```

## Env file

```bash
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_HOST=
DB_PORT=

LOCAL_DEV_APP_PORT=

ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

MAILER_HOST=
MAILER_PORT=
MAILER_USER=
MAILER_PASSWORD=
MAILER_SECURE=

SMTP_USER=
SMTP_PASS=

```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
