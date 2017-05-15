const Bookshelf = require('../modules/connection');
const entity = require('./Entity');
const reply = require('./Reply');

const message = Bookshelf.Model.extend({
  tableName: 'message',
  idAttribute: 'id',
  entities() {
    return this.belongsToMany(entity, 'entity_message');
  },
  replies() {
    return this.hasMany(reply);
  }
});


module.exports = message;
