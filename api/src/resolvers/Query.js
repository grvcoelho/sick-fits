const { forwardTo } = require('prisma-binding')

const Query = {
  item: forwardTo('db'),
  items: forwardTo('db'),
  itemsConnection: forwardTo('db'),

  async me(parent, args, ctx, info) {
    const { userId } = ctx.request

    if (!userId) {
      return null
    }

    return ctx.db.query.user({
      where: { id: userId },
    }, info)
  },
};

module.exports = Query;
