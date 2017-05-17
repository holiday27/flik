const Bookshelf = require('../modules/connection');
// const entity = require('./Entity');
// const messages = require('./Message');

const entityMessages = Bookshelf.Model.extend({
  tableName: 'entity_message'
  // entity() {
  //   return this.belongsTo(entity, 'entity_id', 'id');
  // },
  // messages() {
  //   return this.belongsTo(messages, 'message_id', 'id');
  // }
});


module.exports = entityMessages;
