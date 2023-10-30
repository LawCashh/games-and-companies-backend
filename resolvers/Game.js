import Company from '../models/Company.js';
import Game from '../models/Game.js';

export default {
  Query: {
    games: (_, __, { user }) => {
      if (!user) return new Error('Unauthenticated');
      return Game.find().exec();
    },
  },
  Game: {
    company: (game) => {
      return Company.findById(game.companyId).exec();
    },
  },
  Mutation: {
    addGame: async (parentValue, args, { user }) => {
      if (!user) return new Error('Unauthenticated');
      if (user.role !== 'ADMIN' && user.role !== 'OWNER')
        return new Error('Unauthorized');
      const newGame = new Game({
        title: args.title,
        releaseYear: args.releaseYear,
        companyId: args.companyId || null,
      });
      const doc = await newGame.save();
      if (doc.errors) {
        console.log(doc.errors);
      } else console.log(doc);
    },
  },
};
