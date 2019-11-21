# GraphQL Demo

## Setup

### Dependencies

This project uses MongoDB.  The easiest way to install this is with chocolatey:

```cmd
choco install mongodb

```

Install packages:

```cmd
npm install
```

### VS Code Tools (optional)

For a better developer experience you will want to install the [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) extension.  This has a dependency on Watchman, instructions for installing this can be found [here](https://facebook.github.io/watchman/docs/install.html#binary-downloads-for-linux-macos-and-windows-beta).

## Running

To start the app:

```cmd
npm start
```

## Browse

- The GraphQL playground should be available on [http://localhost:5000/graphql](http://localhost:5000/graphql)
- The app should be available on [http://localhost:5001/](http://localhost:5001/)

## Hack away!

- The server will restart if you make changes
- The app will live reload if you make changes

### Some ideas

- Add another type
- Store projects in there own collection and modify the field resolver to load them
- Add an update developer mutation (hint you might need an [input object type](https://typegraphql.ml/docs/resolvers.html#input-types))
- Add components to display individual developer with more details
- Rewrite the back end in .NET with [Hot Chocolate](https://hotchocolate.io/)
