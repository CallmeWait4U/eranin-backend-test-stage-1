<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

Before running the app, use the following command to generate Prisma Client code:

```bash
$ pnpm prisma generate
```

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

When running the app, Document API Swagger: http://localhost:3000/docs

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Generate Prisma Client

First, to install Prisma Client:

```bash
$ pnpm install @prisma/client
```


To generate Prisma Client code or to re-generate Prisma Client code after changing in file schema.prisma:

```bash
$ pnpm prisma generate
```

To create tables in database or update tables/fields:

```bash
$ pnpm prisma db push
```

To delete and recreate database:

```bash
$ pnpm prisma migrate reset
```