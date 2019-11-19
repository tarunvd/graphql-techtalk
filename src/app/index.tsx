import * as React from "react";
import { render } from "react-dom";
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider, themes } from "@stardust-ui/react";

import { App } from "./App";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "http://localhost:5000/graphql"
    }) as ApolloLink,
    cache: new InMemoryCache()
});

render(
    <Provider theme={themes.teams}>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Provider>,
    document.getElementById("app-root")
);
