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

module.exports = resolvers;
