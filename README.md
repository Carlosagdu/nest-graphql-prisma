# Nestjs Graphql API
 This is an API developed in typescript powered by Graphql/Nestjs

## Introduction
This API is based on a Graphql API insted of RESTful API which enables to use CRUD operations \
The aim is to consume the API from a frontend app where it can interact with it.

## Technologies
The technologies used for this API are: 
- Node js v14.15.5 :arrow_right: Backend language
- Nest js v7.5.5 :arrow_right: Backend framework
- Nest/Graphql v7.9.9 :arrow_right: API Query language
- Prisma :small_red_triangle: ORM
- Postsgresql :file_cabinet: Database


## Set Up
***Please be aware that you MUST set up your own DATABASEURL environment variable for the proper working order.*** \
You can initialize a .env file and store the DATABASEURL env variable in it. \
The Prisma CLI will initialize the env variables in the .env file. \

To run this project. First clone the repository locally using:
```
git clone [repositoryurl]
```

To install dependencies you must run:
```
npm install
```
To enable prisma to apply the schema on schema.prisma to the database schema you can run:
```
npx prisma migrate dev --preview-feature
```

Finally you can start the API using
```
npm run start:dev
```

Now everything is set up :fire:
