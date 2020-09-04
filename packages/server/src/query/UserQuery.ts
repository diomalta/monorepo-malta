import { objectType, stringArg } from '@nexus/schema'

export const UserQuery = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('email', {
      type: 'User',
      resolve: (_parent, _args, ctx) => {
        return ctx.prisma.user.findMany({
          where: { email: _args.email ?? '' },
        })
      },
      args: {
        email: stringArg(),
      },
    })
  },
}).value.definition

// t.field('createPhone', {
//   type: 'Phone',
//   args: {
//     contact: stringArg({ nullable: false }),
//     type: enumType({
//       name: 'typeContact',
//       members: ['cellphone', 'phone'],
//     }),
//     isWhatsapp: booleanArg({ nullable: false }),
//   },
//   resolve: (_, { contact, type, isWhatsapp }, ctx) => {
//     return ctx.prisma.post.create({
//       data: {
//         contact,
//         type,
//         isWhatsapp,
//       },
//     })
//   },
// })
