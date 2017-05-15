const Bookshelf = require('../modules/connection');
const reply = require('./Reply');
const entityMessages = require('./EntityMessage');
const messages = require('./Message');

const entity = Bookshelf.Model.extend({
  tableName: 'entity',
  messages() {
    return this.hasMany(messages);
  }
});


module.exports = entity;
