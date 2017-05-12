const bookshelf = require('../modules/connection');

const entity = bookshelf.Model.extend({
  tableName: 'entity'
});

const message = bookshelf.Model.extend({
  tableName: 'message'
});

const reply = bookshelf.Model.extend({
  tableName: 'reply'
});

const entity_message = bookshelf.Model.extend({
  tableName: 'entity_message'
});

module.exports = { entity, message, reply, entity_message };

  // entity_message.forge().fetchAll().then(result =>JSON.stringify(result, null, 2);
