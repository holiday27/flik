const Bookshelf = require('../modules/connection');

require('./Entity');
require('./Reply');

const Message = Bookshelf.Model.extend({
  tableName: 'message',
  idAttribute: 'id',
  entities() {
    return this.belongsToMany('Entity', 'entity_message', 'message_id');
  },
  replies() {
    return this.hasMany('Reply');
  }
});


module.exports = Bookshelf.model('Message', Message);
