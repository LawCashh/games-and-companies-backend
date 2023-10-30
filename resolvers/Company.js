import Company from '../models/Company.js';
import Game from '../models/Game.js';

export default {
  Query: {
    companies: async (_, __, { user }) => {
      if (!user) return new Error('Unauthenticated');
      return Company.find().exec();
    },
  },
  Company: {
    games: (company) => {
      return Game.find({ companyId: company._id }).exec();
    },
  },
};
