import { objectType } from '@nexus/schema'

export default objectType({
  name: 'Client',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.birthday()
    t.model.user()
  },
})
