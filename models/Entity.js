const Bookshelf = require('../modules/connection');
const message = require('./Message');
// const entityMessages = require('./EntityMessage');
// const entityMessages = require('./EntityMessage');
const entity = Bookshelf.Model.extend({
  tableName: 'entity',
  idAttribute: 'id',
  messages() {
    return this.belongsToMany(message, 'entity_message');
  }
});


module.exports = entity;
