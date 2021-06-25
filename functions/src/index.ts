const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");
const {ApolloServer, gql} = require("apollo-server-express");
const baseURL = "http://swapi.dev/api";
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
type Persons{
    name:String,
    height:String,
    mass:String,
    gender:String,
    homeworld:String
  }
type People {
  count:Int!,
  next:String,
  previous: String,
  results: [Persons]
}
type Query {
    people(pageNumber:Int): People,
    persons(p:String):People
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    people: (_:any, args:any)=> {
      return (
        fetch(`${baseURL}/people/?page=${args.pageNumber}`)
            .then((res:any) => res.json())
            .then((json:any) => json)
      );
    },
    persons: (_:any, args:any)=> {
      return (
        fetch(`${baseURL}/people/?search=${args.p}`)
            .then((res:any) => res.json())
            .then((json:any) => json)
      );
    },
  },
};

// Create GraphQL express server


// Setup express cloud function
const app = express();

// Create graphql server
const server = new ApolloServer({typeDefs, resolvers, playground: true});
server.applyMiddleware({app, path: "/", cors: true});

exports.graphql = functions.https.onRequest(app);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
// const {ApolloServer, gql} = require("apollo-server-cloud-functions");
// const functions = require('firebase-functions');
// const baseURL = "http://swapi.dev/api";
// const typeDefs = gql`
// type Persons{
//     name:String,
//     height:String,
//     mass:String,
//     gender:String,
//     homeworld:String
//   }
// type People {
//   count:Int!,
//   next:String,
//   previous: String,
//   results: [Persons]
// }
// type Query {
//     people(pageNumber:Int): People,
//     persons(p:String):People
//   }
// `;
//
// const resolvers = {
//   Query: {
//     people: (_:any, args:any)=> {
//       return (
//         fetch(`${baseURL}/people/?page=${args.pageNumber}`)
//             .then((res:any) => res.json())
//             .then((json:any) => json)
//       );
//     },
//     persons: (_:any, args:any)=> {
//       return (
//         fetch(`${baseURL}/people/?search=${args.p}`)
//             .then((res:any) => res.json())
//             .then((json:any) => json)
//       );
//     },
//   },
// };
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   playground: true,
//   introspection: true,
// });
// exports.getUsers = functions.https.onRequest(async (req, res) => {});
// // const server = new ApolloServer({ typeDefs, resolvers });
// exports.handler = server.createHandler('/');
