import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

import { connect } from "./db";
import { log } from "./log";
import { DeveloperResolver } from "./developers/DeveloperResolver";
import { TypegooseMiddleware } from "./typegooseMiddleware";

const init = async () => {

    await connect();

    const schema = await buildSchema({
        resolvers: [
            DeveloperResolver
        ],
        emitSchemaFile: {
            commentDescriptions: true
        },
        globalMiddlewares: [
            TypegooseMiddleware
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
