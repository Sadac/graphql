const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require("./types/user_type");
const AuthService = require("./../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return AuthService.signup({
          email: args.email,
          password: args.password,
          req
        });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        // passport introduce el metodo logout al request object, solo hay que invocarlo
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args, req) {
        return AuthService.login({
          email: args.email,
          password: args.password,
          req
        });
      }
    }
  }
});

module.exports = mutation;
