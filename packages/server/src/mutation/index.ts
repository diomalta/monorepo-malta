import { objectType } from '@nexus/schema'

import { MutationUser } from './UserMutation'
import { MutationClient } from './ClientMutation'

export default objectType({
  name: 'Mutation',
  definition(t) {
    MutationUser(t)
    MutationClient(t)
  },
})
