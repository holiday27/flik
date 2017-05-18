// Mutation Entity
mutation addEntity($updateEntityInput:AddEntityInput!) {
  addEntity(input: $updateEntityInput) {
    entity {
      name
    }
    clientMutationId

  }
}

// Query Variables
{
  "updateEntityInput": {
    "name": "Mutation Teste",
    "clientMutationId": "549b5e7c-0516-4fc9-8944-125401211590"
  }
}

mutation uploadEntity($up: UploadEntityInput!){
	updateEntity(input: $up){
    entity{
      id
      name
      created
      modified
    }
  }

}
{
  "up": {
    "id": 15,
    "name": "Mutation UPLOAD",
    "clientMutationId": "549b5e7c-0516-4fc9-8944-125401211590"
  }
}

mutation deleteEntity($up: DeleteEntityInput!){
	deleteEntity(input: $up){
    entity{
      id
      name
      created
      modified
    }
  }

}

{
  "up": {
    "id": 15,
    "clientMutationId": "549b5e7c-0516-1312312-8944-125401211590"
  }
}


// Mutation Reply
mutation addReply($up: AddReplyInput!){
	addReply(input: $up){
    reply{
      id
      entity_id
      created
      modified
    }
  }

}

{
  "up": {
    "id": 10
    "message_id": 1,
    "entity_id": 8,
    "content": "mutation addReply 2.0",
    "clientMutationId": "549b5e7c-3123123-1312312-8944-125401211590"
  }
}
mutation updateReply($up: UpdateReplyInput!){
	updateReply(input: $up){
    reply{
      id
      message_id
      entity_id
      content
      created
      modified
    }
  }

}

{
  "up": {
    "id": 8,
    "message_id": 1,
    "entity_id": 8,
    "content": "here!",
    "clientMutationId": "549b5e7c-3123123-1312312-8944-125401211590"
  }
}
mutation deleteReply($up: DeleteReplyInput!){
	deleteReply(input: $up){
    reply{
      id
      message_id
      entity_id
      content
      created
      modified
    }
  }

}

{
  "up": {
    "id": 7,
    "message_id": 1,
    "entity_id": 8,
    "clientMutationId": "549b5e7c-3123123-1312312-8944-125401211590"
  }
}
// Mutation Message
