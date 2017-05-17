const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const entity = require('../models/Entity');
const reply = require('../models/Reply');
const messages = require('../models/Message');
const replyType = require('./replyType');
// const messageType = require('./messageType');
// const entityType = require('./entityType');

const entityType = new GraphQLObjectType({
  name: 'entity',
  description: 'Entity',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(tableEntity) {
        return tableEntity.get('id');
      }
    },
    name: {
      type: GraphQLString,
      resolve(tableEntity) {
        return tableEntity.get('name');
      }
    },
    created: {
      type: GraphQLString,
      resolve(tableEntity) {
        return tableEntity.get('created');
      }
    },
    modified: {
      type: GraphQLString,
      resolve(tableEntity) {
        return tableEntity.get('modified');
      }
    },
    messages: {
      type: new GraphQLList(messageType),
      description: 'Represents entitites message',
      resolve: async (model) => {
        const collection = await model.messages().fetch();
        return collection.models;
      }
    }
  })
});


const messageType = new GraphQLObjectType({
  name: 'messages',
  description: 'Messages',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(tableMessage) {
        return tableMessage.get('id');
      }
    },
    content: {
      type: GraphQLString,
      resolve(tableMessage) {
        return tableMessage.get('content');
      }
    },
    created: {
      type: GraphQLString,
      resolve(tableMessage) {
        return tableMessage.get('created');
      }
    },
    modified: {
      type: GraphQLString,
      resolve(tableMessage) {
        return tableMessage.get('modified');
      }
    },
    replies: {
      type: new GraphQLList(replyType),
      resolve: async (model) => {
        const collection = await model.replies().fetch();
        return collection.models;
      }
    },
    entities: {
      type: new GraphQLList(entityType),
      description: 'Represents entitites on the message',
      resolve: async (model) => {
        const collection = await model.entities().fetch();
        return collection.models;
      }
    }
  })
});


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
