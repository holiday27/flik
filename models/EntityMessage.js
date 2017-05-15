const Bookshelf = require('../modules/connection');
const entity = require('./Entity');
const messages = require('./Message');

const entityMessages = Bookshelf.Model.extend({
  tableName: 'entity_message',
  entity() {
    return this.belongsToMany(entity, 'entity');
  },
  messages() {
    return this.belongsToMany(messages, 'message');
  }
});


module.exports = entityMessages;
