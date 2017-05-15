const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

const replyType = require('./replyType');
const entityType = require('./entityType');

// console.log('entityType', entityType);


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
    },
    entities: {
      type: new GraphQLList(entityType)
    }
  })
});


module.exports = messageType;
