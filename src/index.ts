require("dotenv").config();
import "reflect-metadata";

// Resolvers
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import { UserResolver } from "./resolvers/GetUserResolver";

import { isInProduction } from "./common/constants";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";

import { Users } from "./entity/Users";

import express from "express";
import helmet from "helmet";
import Moment from "moment";
import https from "https";
import * as fs from "fs";
import path from "path";

async function main() {
  // Connect to Database
  await connect();

  // Setup ApolloServer
  const app = express();
  const port = process.env.PORT || 8080;
  const hostname = process.env.HOST || "localhost";

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver, UserResolver],
    }),
    introspection: true,
    playground: true,
    context: ({ req, res }) => ({ req, res }),
  });

  app.use(helmet());
  server.applyMiddleware({ app, cors: false });

  if (isInProduction) {
    const options = {
      key: fs.readFileSync(path.join(__dirname, "../privkey.pem")),
      cert: fs.readFileSync(path.join(__dirname, "../fullchain.pem")),
    };

    https
      .createServer(options, app)
      .listen(port, () =>
        console.log(
          "🚀 Server ready at",
          `https://${hostname}:${port}${server.graphqlPath}`
        )
      );
  } else {
    app.listen(port, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
    });
  }
}

const connect = async () => {
  // Todo: Add arguments
  await createConnection({
    type: ,
    host: ,
    username: ,
    database: ,
    password: ,
    synchronize: true,
    logging: true,
    entities: [Users],
  });
};

main().catch((err) => {
  console.log(err);

  if (!isInProduction) {
    return;
  }

  const date = Moment().format("Do MMM YYYY, HH.mm.ss");

  fs.writeFileSync(path.join(process.cwd(), `/Error ${date}.txt`), err.stack);
});
