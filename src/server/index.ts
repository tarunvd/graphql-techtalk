import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

import { connect } from "./db";
import { TodoResolver } from "./todos/TodoResolver";
import { log } from "./log";

const init = async () => {

    await connect();

    const schema = await buildSchema({
        resolvers: [
            TodoResolver
        ]
    });

    const apolloServer = new ApolloServer({
        schema
    });

    const { url } = await apolloServer.listen({
        port: 5000
    });

    log(`Server listening at: ${url}`);
  };

init();
