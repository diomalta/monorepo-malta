import { objectType } from '@nexus/schema'

export const MutationUser = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'createUser' })
    t.crud.deleteOneUser()
  },
}).value.definition
