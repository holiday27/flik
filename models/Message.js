const Bookshelf = require('../modules/connection');
const reply = require('./Reply');

const message = Bookshelf.Model.extend({
  tableName: 'message',
  replies() {
    return this.hasMany(reply);
  }
});


module.exports = message;
