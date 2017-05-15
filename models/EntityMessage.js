const Bookshelf = require('../modules/connection');
const entity = require('./Entity');
const messages = require('./Message');

const entityMessages = Bookshelf.Model.extend({
  tableName: 'entityMessages',
  entity() {
    return this.belongsTo(entity);
  },
  messages() {
    return this.belongsTo(messages);
  }
});


module.exports = entityMessages;
