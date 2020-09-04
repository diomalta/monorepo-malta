import { objectType } from '@nexus/schema'

export const MutationClient = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneClient({ alias: 'createClient' })
    t.crud.deleteOneClient()
  },
}).value.definition
