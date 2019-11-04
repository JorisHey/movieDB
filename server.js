import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from './webpack.config.js';

const app = express();
app.use(webpackMiddleware(webpack(webpackConfig)));

// app.get('/', (req, res) => {
//   console.log(`Root`);
// });

const server = app.listen(5000, () => {
  console.log(`The server is listening on port: ${server.address().port}`);
});
