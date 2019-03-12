const express = require("express");
const app = express();
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

// Cualquier peticion que venga a esta URL, la manejara GraphQL
app.use(
  "/graphql",
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => console.log("listening on 4000"));
