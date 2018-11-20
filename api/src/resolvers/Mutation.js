const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const defaultCookieOptions = {
  httpOnly: true,
  maxAge: 1000 * 60 * 60 * 24 * 365,
}

const Mutation = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem({
      data: {
        ...args,
      },
    }, info)

    return item
  },

  async updateItem(parent, args, ctx, info) {
    const updates = { ...args }
    delete updates.id

    const item = await ctx.db.mutation.updateItem({
      data: updates,
      where: {
        id: args.id,
      },
    }, info)

    return item
  },

  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id }

    const item = await ctx.db.query.item({ where }, '{ id title }')
    // TODO: Check if the user owns the item before deleting

    return ctx.db.mutation.deleteItem({ where }, info)
  },

  async signup(parent, args, ctx, info) {
    const email = args.email.toLowerCase()
    const password = await bcrypt.hash(args.password, 10)

    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          email,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    )

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, defaultCookieOptions)

    return user
  },

  async signin(parent, args, ctx, info) {
    const { email, password } = args

    const user = await ctx.db.query.user({ where: { email } })

    if (!user) throw new Error(`No such user found for email ${email}`)

    const valid  = await bcrypt.compare(password, user.password)

    if (!valid) throw new Error(`Invalid password`)

    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, defaultCookieOptions)

    return user
  },

  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token', defaultCookieOptions)

    return { message: 'Goodbye!' }
  },
};

module.exports = Mutation;
