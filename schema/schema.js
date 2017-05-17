const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString
} = require('graphql');
const { mutationWithClientMutationId } = require('graphql-relay');

// const { message } = require('../models/circularModel'); Solução provisória
const entity = require('../models/Entity');
const message = require('../models/Message');
const replyType = require('./replyType');


/* Query */

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

/* Mutation */

// const addMessage = new GraphQLObjectType({
//   name: 'mutation addmessage',
//   description: 'Mutation fro adding data on Message table',
//   fields: () => ({
//     addMessage: {
//       type: messageType,
//       args: {
//         content: { type: GraphQLString }
//       },
//       resolve: () => null
//     }
//   })
// });
const addEntity = mutationWithClientMutationId({
  name: 'AddEntity',
  inputFields: {
    name: {
      type: GraphQLString
    }
  },
  outputFields: {
    entity: {
      type: entityType,
      resolve: obj => obj
    }
  },
  mutateAndGetPayload: async (input) => {
    const saved = await entity.forge({ name: input.name }).save();
    return saved;
  }
});

const updateEntity = mutationWithClientMutationId({
  name: 'UpdateEntity',
  inputFields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  },
  outputFields: {
    entity: {
      type: entityType,
      resolve: obj => obj
    }
  },
  mutateAndGetPayload: async (input) => {
    // console.log('input-id: ', input.id);
    // const saved = await entity.forge({ name: input.name }).where({ id: input.id });
    const date = new Date();
    console.log(date);
    const target = await entity.forge({ id: input.id }).fetch();
    target.set({ name: input.name }).save();
    console.log('Target: ', target);
    return target;
  }
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Mutation root',
  fields: () => ({
    addEntity,
    updateEntity
    // ,
    // updateEntity: {
    //   type: entityType,
    //   args: {
    //     id: { type: GraphQLInt },
    //     name: { type: GraphQLString }
    //   },
    //   resolve(root, args) {
    //     return 'mutation';
    //   }
    // },
    // deleteEntity: {
    //   type: entityType,
    //   args: {
    //     id: { type: GraphQLInt }
    //   },
    //   resolve(root, args) {
    //     return 'mutation';
    //   }
    // }
  })
});


const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Query root',
  fields: () => ({
    entities: {
      type: new GraphQLList(entityType),
      args: {
        id: { type: GraphQLInt }
      },
      resolve(root, args) {
        return entity.forge().where(args).fetchAll();
      }
    },
    messages: {
      type: new GraphQLList(messageType),
      args: {
        id: { type: GraphQLInt }
      },
      resolve(root, args) {
        return message.forge().where(args).fetchAll();
      }
    }
  })
});


const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

module.exports = Schema;
