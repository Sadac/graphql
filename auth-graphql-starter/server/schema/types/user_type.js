const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID }, // esto permite usar el dataIdFromObject en el ApolloClient Config
    email: { type: GraphQLString }
  }
});

module.exports = UserType;
