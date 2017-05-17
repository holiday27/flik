const Bookshelf = require('../modules/connection');
require('./Message');

const Entity = Bookshelf.Model.extend({
  tableName: 'entity',
  idAttribute: 'id',
  messages() {
    return this.belongsToMany('Message', 'entity_message', 'entity_id');
  }
});


module.exports = Bookshelf.model('Entity', Entity);
