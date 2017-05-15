const Bookshelf = require('../modules/connection');

const entity = Bookshelf.Model.extend({
  tableName: 'entity'
});

module.exports = entity;
