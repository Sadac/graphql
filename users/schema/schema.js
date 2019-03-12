const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const axios = require("axios");
//const _ = require("lodash");

// const users = [
//   { id: "23", firstName: "Bill", age: 20 },
//   { id: "47", firstName: "Samantha", age: 21 }
// ];

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    // wrapea en arrow function para resolver circular references
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType), // Array de UserType
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data);
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve(parentValue, args) {
        //console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          .then(res => res.data);
        //return _.find(users, { id: args.id });
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      // type es el tipo de dato que retornamos. Aveces no es el mismo al que hacemos referencia: addUser
      // Aca trabajamos con User, pero no necesariamente siempre se retorna un tipo Usuario
      type: UserType,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, { firstName, age }) {
        // Aca es donde crearemos la nueva data para nuestra base de datos
        return axios
          .post("http://localhost:3000/users", { firstName, age })
          .then(res => res.data);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/users/${id}`)
          .then(res => res.data);
        // La respuesta sera un UserType con id null, porque ya fue eliminado
      }
    },
    editUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        companyId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/users/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});

/**
 * 1. Una razon desesperada para aprender el idioma: Better Payment
 * 2. Sumergete en el lenguaje, todos los días en cada momento
 *    - Mira peliculas en ingles, escucha canciones en ingles
 * 3. Hacer un amigo o tener un mentor con quien hablar el ingles
 *
 * My desperate reason why I want to learn english is: Get a better paid
 *  Job
 *
 * 1. Pick up a grammar book
 * 2. Pick up a phrase book
 * 3. Diccionario de antonimos y sinonimos
 *
 * Lee un libro, 2 parrafos, grabalo. Luego leelo mientras escuchas tu grabacion
 * Reduce the amount of time you speak your native language
 *
 */