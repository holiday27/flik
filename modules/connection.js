'use strict';

const options = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'javaForLive'
  },
  pool: {
    min: 0,
    max: 100
  }
};

const knex = require('knex')(options);

const Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
