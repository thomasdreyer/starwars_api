export {};
const {ApolloServer, gql}  = require("apollo-server-express");
const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");
const baseURL = "http://swapi.dev/api";
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


const app = express();
const server = new ApolloServer({typeDefs, resolvers, playground: true});
server.applyMiddleware({app, path: "/", cors: true});

exports.graphql = functions.https.onRequest(app);
