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
      type: new GraphQLList(messageType)
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
      type: new GraphQLList(replyType)


      // resolve(tableMessage) {
      //   // console.log('tableType', tableMessage.toJSON());
      //   messages.forge({ id: tableMessage.get('id') }).fetch({ withRelated: 'replies' }).then((message) => {
      //     console.log(tableMessage.get('id'));
      //     console.log(replies);
      //     return replies;
      //   });
      // }
    },
    entities: {// this.belongsToMany('entity_message', {
      type: new GraphQLList(entityType),
      description: 'Represents entitites on the message'
    }// )
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
