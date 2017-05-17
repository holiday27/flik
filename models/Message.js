const Bookshelf = require('../modules/connection');
const entity = require('./Entity');
const reply = require('./Reply');

const message = Bookshelf.Model.extend({
  tableName: 'message',
  idAttribute: 'id',
  entities() {
    return this.belongsToMany(entity, 'entity_message', 'message_id');
  },
  replies() {
    return this.hasMany(reply);
  }
});


module.exports = message;
