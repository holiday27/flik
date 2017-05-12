'use strict';

let options;

if (process.env.NODE_ENV === 'production') {
  options = {
    client: 'mysql',
    connection: {
      host: 'aa1r15dvbaun7w4.cqf3eqxphsdl.us-west-2.rds.amazonaws.com',
      port: '3306',
      user: 'interno',
      password: 'da0d20e5c0f50e4a5ebcebaf63638147',
      database: 'ebdb',
      ssl: 'Amazon RDS'
    },
    pool: {
      min: 0,
      max: 100
    }
  };
} else {
  options = {
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
}

const knex = require('knex')(options);

const Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf;
