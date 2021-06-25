const {gql} = require("apollo-server-express");

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

module.exports = typeDefs;
