const express = require('express');
const router = express.Router();
const bookshelf = require('../modules/connection');
/* GET home page. */
const entity = {
  id: 8
};
/* GET home page. */
const entity2 = {
  id: 9
};

const entityArray = [];

entityArray.push(entity);

entityArray.push(entity2);

const entityTable = bookshelf.Model.extend({
  tableName: 'entity'
});

router.get('/', (req, res, next) => {
  entityTable.forge().fetch().then((result) => {
    console.log(result);
    res.send(JSON.stringify(result, null, 2));
  });
});

module.exports = router;
