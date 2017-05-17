const Bookshelf = require('../modules/connection');
const entity = require('./Entity');
const message = require('./Message');

const reply = Bookshelf.Model.extend({
  tableName: 'reply',
  entities() {
    return this.belongsTo(entity, 'entity');
  },
  message() {
    return this.belongsTo(message, 'message');
  }
});


module.exports = reply;
