// const message = require('../models/Message');
// const entity = require('../models/Entity');


/* Teste message */
// message.forge({ id: 4 }).fetch({ withRelated: 'entities' }).then((message) => {
//   const entities = message.related('entities').toJSON();
//   console.log((entities));
// });
//
// message.forge({ id: 4 }).fetch({ withRelated: 'replies' }).then((message) => {
//   const replies = message.related('replies');
//   // console.log(JSON.stringify(replies));
// });


/* Teste Entity */
//
// entity.forge({ id: 11 }).fetch({ withRelated: 'messages' }).then((result) => {
//   const messages = result.related('messages').toJSON();
//   console.log(messages);
// });
