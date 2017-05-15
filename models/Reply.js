const Bookshelf = require('../modules/connection');
const entity = require('./Entity');
const messages = require('./Message');

const reply = Bookshelf.Model.extend({
  tableName: 'reply',
  entity() {
    return this.belongsTo(entity);
  },
  message() {
    return this.belongsTo(messages);
  }
});


module.exports = reply;
