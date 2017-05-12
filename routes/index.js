const express = require('express');
const router = express.Router();
const bookshelf = require('../modules/connection');
// const { entity, entity_message } = require('../modules/connection');
// const selectAllB = require('../modules/exemples');

const entity = bookshelf.Model.extend({
  tableName: 'entity'
});

router.get('/', (req, res, next) => {
  entity.forge().fetchAll().then(result => res.send(JSON.stringify(result, null, 2)));
  // next();
});

router.post('/', (req, res, next) => {
  res.send();
});

module.exports = router;
