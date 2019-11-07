import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import axios from 'axios';

const NewMoviesType = new GraphQLObjectType({
  name: 'NewMovies',
  fields: {
    id: { type: GraphQLInt },
    poster_path: { type: GraphQLString },
    title: { type: GraphQLString }
  }
});

const ProductionCompaniesType = new GraphQLObjectType({
  name: 'ProductionCompanies',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  }
});

const MovieInfoType = new GraphQLObjectType({
  name: 'MovieInfo',
  fields: {
    id: { type: GraphQLInt },
    overview: { type: GraphQLString },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    genres: { type: GraphQLString },
    release_date: { type: GraphQLString },
    vote_average: { type: GraphQLString },
    production_companies: { type: new GraphQLList(ProductionCompaniesType) },
    runtime: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    newMovies: {
      type: new GraphQLList(NewMoviesType),
      resolve() {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=nl-NL&page=1`
          )
          .then(res => {
            const movies = [];

            for (const movie of res.data.results) {
              movie.poster_path =
                'https://image.tmdb.org/t/p/w500' + movie.poster_path;
              movies.push(movie);
            }
            return movies;
          });
      }
    },
    movieInfo: {
      type: MovieInfoType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.API_KEY}&language=nl-NL&page=1`
          )
          .then(res => res.data);
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
