const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const entity = require('../models/Entity');

const Entity = new GraphQLObjectType({
  name: 'entity',
  description: 'Table Entity',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(tableEntity) {
        return tableEntity.id;
      }
    },
    name: {
      type: GraphQLString,
      resolve(tableEntity) {
        return tableEntity.name;
      }
    },
    created: {
      type: GraphQLString,
      resolve(tableEntity) {
        return tableEntity.created;
      }
    },
    modified: {
      type: GraphQLString,
      resolve(tableEntity) {
        return tableEntity.modified;
      }
    }
  })
});


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query root',
  fields: () => ({
    entity: {
      type: new GraphQLList(Entity),
      args: {
        id: {
          type: GraphQLInt
        },
        name: {
          type: GraphQLString
        }
      },
      resolve(root, args) {
        return entity.forge().where(args).fetchAll();
      }
    }
  })
});

const Schema = new GraphQLSchema({
  query: Query
});

module.exports = Schema;
