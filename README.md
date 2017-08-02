# graphql-cli-codegen

apollo-codegen plugin for graphql-cli

**Warning!** This plugin is highly experimental. It is not tested at all and hacks with the codegen internals. Don't expect immediate support.

## Installation

```
npm i -g graphql-cli graphql-cli-codegen
```

## Usage

Configure the plugin via a `.graphqlconfig`.

The schema will be obtained from the `schemaPath` key and the files from the `includes` key.

All other options such as `target` or `output` must be placed in the `codegen` key.

Here is an example:

`.graphqlconfig`
```json
{
  "schemaPath": "schema.graphqls",
  "includes": [
    "src/**/*.graphql",
    "src/**/*.gql",
  ],
  "codegen": {
    "target": "flow",
    "output": "src/graphql-annotations.js"
  }
}
```

You can now run:
```
graphql codegen
```

It's done now!
