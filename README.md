# StarWars API

A GraphQL API should wrap the Star Wars API (https://swapi.dev/)

## Live at

https://us-central1-starwars-b6a99.cloudfunctions.net/graphql

### Queries

`` {
    people(pageNumber:1){
      count
      results{
      name,
      height,
      mass,
      gender,
      homeworld
      }
    }
  }``

  ``{
         persons(p:"Anakin%20Skywalker") {
               results{
               name,
             height,
             mass,
             gender,
             homeworld
             }
           }
       } ``
