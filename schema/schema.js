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
const reply = require('../models/Reply');
const replyType = require('./replyType');
const timestamp = require('../util/util');


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
    const date = timestamp();
    const target = await entity.forge({ id: input.id }).fetch();

    if (!target) throw Error('Object not found');
    target.set({ name: input.name, modified: date }).save();

    return target;
  }
});

const deleteEntity = mutationWithClientMutationId({
  name: 'DeleteEntity',
  inputFields: {
    id: { type: GraphQLInt }
  },
  outputFields: {
    entity: {
      type: entityType,
      resolve: obj => obj
    }
  },
  mutateAndGetPayload: async (input) => {
    const target = await entity.forge({ id: input.id }).fetch();
    if (!target) throw Error('Object not found');

    const cloned = target.clone();
    await target.destroy();

    return cloned;
  }
});

const addReply = mutationWithClientMutationId({
  name: 'AddReply',
  inputFields: {
    message_id: { type: GraphQLInt },
    entity_id: { type: GraphQLInt },
    content: { type: GraphQLString }
  },
  outputFields: {
    reply: {
      type: replyType,
      resolve: obj => obj
    }
  },
  mutateAndGetPayload: async (input) => {
    const moment = timestamp();
    const messageFetch = await message.forge().where({ id: input.message_id }).fetch();
    if (!messageFetch) throw Error('Object not found');

    const replyMessage = {
      content: input.content,
      entity_id: input.entity_id,
      message_id: input.message_id,
      created: moment
    };

    const saved = await reply.forge(replyMessage).save();
    return saved;
  }
});

const updateReply = mutationWithClientMutationId({
  name: 'UpdateReply',
  inputFields: {
    id: { type: GraphQLInt },
    message_id: { type: GraphQLInt },
    entity_id: { type: GraphQLInt },
    content: { type: GraphQLString }
  },
  outputFields: {
    reply: {
      type: replyType,
      resolve: obj => obj
    }
  },
  mutateAndGetPayload: async (input) => {
    const moment = timestamp();
    const replyFetch = await reply.forge()
    .where({ id: input.id, message_id: input.message_id, entity_id: input.entity_id }).fetch();
    if (!replyFetch) throw Error('Object not found');

    const replyMessage = {
      content: input.content,
      modified: moment
    };

    replyFetch.set(replyMessage).save();
    return replyFetch;
  }
});

const deleteReply = mutationWithClientMutationId({
  name: 'DeleteReply',
  inputFields: {
    id: { type: GraphQLInt },
    message_id: { type: GraphQLInt },
    entity_id: { type: GraphQLInt }
  },
  outputFields: {
    reply: {
      type: replyType,
      resolve: obj => obj
    }
  },
  mutateAndGetPayload: async (input) => {
    const replyObj = {
      id: input.id,
      message_id: input.message_id,
      entity_id: input.entity_id
    };
    const target = await reply.forge().where(replyObj).fetch();
    if (!target) throw Error('Object not found');

    const clone = target.clone();
    await target.destroy();

    return clone;
  }
});

const Mutation = new GraphQLObjectType({
  name: 'mutation',
  description: 'Mutation root',
  fields: () => ({
    addEntity,
    updateEntity,
    deleteEntity,
    addReply,
    updateReply,
    deleteReply
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
