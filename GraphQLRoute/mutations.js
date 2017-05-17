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


// Mutation Reply


// Mutation Message
