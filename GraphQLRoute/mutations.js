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


// Mutation Message
