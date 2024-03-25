## Description
Fitly is a service for quickly and efficiently shortening URLs.

## Requirements
Make sure you have the following installed:

- Docker
- Node.js 21.x

## Installation

```bash
$ yarn install
```

## Running the app locally

```bash
# locally
$ docker compose up -d
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Commit

```bash
# unit tests
$ yarn commit
```

## Migrations

```bash
# create new migration
$ npx prisma migrate dev --name <name>
```