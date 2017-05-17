const Bookshelf = require('../modules/connection');
const reply = require('./Reply');

const entity = Bookshelf.Model.extend({
  tableName: 'entity',
  idAttribute: 'id',
  messages() {
    return this.belongsToMany(message, 'entity_message', 'entity_id');
  }
});

const message = Bookshelf.Model.extend({
  tableName: 'message',
  idAttribute: 'id',
  entities() {
    console.log(entity);
    return this.belongsToMany(entity, 'entity_message', 'message_id');
  },
  replies() {
    return this.hasMany(reply);
  }
});

module.exports = { entity, message };
