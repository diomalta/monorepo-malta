import { objectType } from '@nexus/schema'

import { UserQuery } from './UserQuery'

export default objectType({
  name: 'Query',
  definition(t) {
    UserQuery(t)
  },
})
