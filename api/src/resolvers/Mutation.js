global.dogs = global.dogs || []

const Mutation = {
  createDog(parent, args, ctx, info) {
    const newDog = { name: args.name }
    global.dogs.push(newDog)
    return newDog
  },
};

module.exports = Mutation;
