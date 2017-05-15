const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const entity = require('../models/Entity');
const messages = require('../models/Message');
const messageType = require('./messageType');
const entityType = require('./entityType');


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query root',
  fields: () => ({
    entities: {
      type: new GraphQLList(entityType),
      resolve(root, args) {
        return entity.forge().where(args).fetchAll();
      }
    },
    messages: {
      type: new GraphQLList(messageType),
      resolve(root, args) {
        return messages.forge().where(args).fetchAll();
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;
