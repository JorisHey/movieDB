"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const axios_1 = __importDefault(require("axios"));
const NewMoviesType = new graphql_1.GraphQLObjectType({
    name: 'NewMovies',
    fields: {
        id: { type: graphql_1.GraphQLInt },
        poster_path: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        overview: { type: graphql_1.GraphQLString }
    }
});
const MovieSearchType = new graphql_1.GraphQLObjectType({
    name: 'MovieSearch',
    fields: {
        poster_path: { type: graphql_1.GraphQLString },
        overview: { type: graphql_1.GraphQLString },
        release_date: { type: graphql_1.GraphQLString },
        id: { type: graphql_1.GraphQLInt },
        title: { type: graphql_1.GraphQLString },
        popularity: { type: graphql_1.GraphQLFloat },
        vote_average: { type: graphql_1.GraphQLFloat }
    }
});
const ProductionCompaniesType = new graphql_1.GraphQLObjectType({
    name: 'ProductionCompanies',
    fields: {
        id: { type: graphql_1.GraphQLInt },
        name: { type: graphql_1.GraphQLString }
    }
});
const MovieVideoType = new graphql_1.GraphQLObjectType({
    name: 'MovieVideo',
    fields: {
        id: { type: graphql_1.GraphQLString },
        key: { type: graphql_1.GraphQLString }
    }
});
const MovieInfoType = new graphql_1.GraphQLObjectType({
    name: 'MovieInfo',
    fields: {
        id: { type: graphql_1.GraphQLInt },
        overview: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        poster_path: { type: graphql_1.GraphQLString },
        genres: { type: graphql_1.GraphQLString },
        release_date: { type: graphql_1.GraphQLString },
        vote_average: { type: graphql_1.GraphQLString },
        production_companies: { type: new graphql_1.GraphQLList(ProductionCompaniesType) },
        runtime: { type: graphql_1.GraphQLString },
        videos: {
            type: new graphql_1.GraphQLList(MovieVideoType),
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent) {
                return axios_1.default
                    .get(`https://api.themoviedb.org/3/movie/${parent.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)
                    .then(res => res.data.results);
            }
        }
    }
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        newMovies: {
            type: new graphql_1.GraphQLList(NewMoviesType),
            resolve() {
                return axios_1.default
                    .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=nl-NL&page=1`)
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
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return axios_1.default
                    .get(`https://api.themoviedb.org/3/movie/${args.id}?api_key=${process.env.API_KEY}&language=nl-NL&page=1`)
                    .then(res => {
                    const movie = res.data;
                    movie.poster_path =
                        'https://image.tmdb.org/t/p/w500' + movie.poster_path;
                    return movie;
                });
            }
        },
        searchMovie: {
            type: new graphql_1.GraphQLList(MovieSearchType),
            args: { title: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return axios_1.default
                    .get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=nl-NL&query=${args.title}&page=1&include_adult=false
            `)
                    .then(res => {
                    console.log(res);
                    return res.data.results;
                });
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
//# sourceMappingURL=schema.js.map