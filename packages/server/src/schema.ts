import {
  intArg,
  makeSchema,
  objectType,
  stringArg,
  booleanArg,
  enumType,
} from '@nexus/schema'
import { nexusPrismaPlugin } from 'nexus-prisma'

const User = objectType({
  name: 'Client',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.phones({
      pagination: false,
    })
  },
})

const Post = objectType({
  name: 'Phone',
  definition(t) {
    t.model.id()
    t.model.contact()
    t.model.type()
    t.model.isWhatsapp()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.phone()

    t.list.field('whatsapp', {
      type: 'Phone',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { isWhatsapp: true },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneClient({ alias: 'createClient' })
    t.crud.deleteOneClient()

    t.field('createPhone', {
      type: 'Phone',
      args: {
        contact: stringArg({ nullable: false }),
        type: enumType({
          name: 'typeContact',
          members: ['cellphone', 'phone'],
        }),
        isWhatsapp: booleanArg({ nullable: false }),
      },
      resolve: (_, { contact, type, isWhatsapp }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            contact,
            type,
            isWhatsapp,
          },
        })
      },
    })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, Post, User],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
