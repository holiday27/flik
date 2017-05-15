const express = require('express');
const logger = require('morgan');
const app = express();
const bookshelf = require('./modules/connection');

// const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const schema = require('./schema/schema');
app.use(logger('dev'));

const APP_PORT = 4000;


// Construct a schema, using GraphQL schema language
// const schema = buildSchema(`
//   type Query {
//     entity: String
//   }
// `);


// const entity = bookshelf.Model.extend({
//   tableName: 'entity'
// });
//
// // The root provides a resolver function for each API endpoint
// const root = {
//   entity: () => entity.forge().fetchAll().then(result => JSON.stringify(result, null, 2))
// };

// const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));
app.listen(APP_PORT);
console.log('Running a GraphQL API server at localhost:4000/graphql');


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
