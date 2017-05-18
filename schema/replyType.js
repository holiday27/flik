const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
} = require('graphql');

const replyType = new GraphQLObjectType({
  name: 'reply',
  description: 'Reply Messages',
  fields: () => ({
    content: {
      type: GraphQLString,
      resolve(tableReply) {
        return tableReply.get('content');
      }
    },
    id: {
      type: GraphQLInt,
      resolve(tableReply) {
        return tableReply.get('id');
      }
    },
    message_id: {
      type: GraphQLInt,
      resolve(tableReply) {
        return tableReply.get('message_id');
      }
    },
    entity_id: {
      type: GraphQLInt,
      resolve(tableReply) {
        return tableReply.get('entity_id');
      }
    },
    created: {
      type: GraphQLString,
      resolve(tableReply) {
        return tableReply.get('created');
      }
    },
    modified: {
      type: GraphQLString,
      resolve(tableReply) {
        return tableReply.get('modified');
      }
    }
  })
});

module.exports = replyType;
