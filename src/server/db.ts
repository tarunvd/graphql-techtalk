import { connect as mongooseConnect, connection } from "mongoose";

import { log } from "./log";

export const connect = async () => {
    const url = "mongodb://localhost:27017/node-graphql";

    mongooseConnect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    connection.once("open", () => log(`Connected to mongo at ${url}`));
};
