import { objectType } from '@nexus/schema'

export default objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.password()
    t.model.role()
    t.model.username()
    t.model.clients({
      pagination: false,
    })
  },
})
