const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString
  // GraphQLList
} = require('graphql');

// const messageType = require('./messageType');

// console.log('messageType', messageType);

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
    }
    // messages: {
    //   type: new GraphQLList(messageType),
    //   resolve(tableEntity) {
    //     return null;
    //   }
    // }
  })
});

module.exports = entityType;
