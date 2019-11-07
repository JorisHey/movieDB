import express from 'express';
import expressGraphQL from 'express-graphql';
import schema from './schema/schema';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);
const server = app.listen(5000, () => {
  console.log(`The server is listening on port: ${server.address().port}`);
});
