import companyResolvers from './Company.js';
import gameResolvers from './Game.js';
import userResolvers from './User.js';

export default {
  Query: {
    ...companyResolvers.Query,
    ...gameResolvers.Query,
    ...userResolvers.Query,
  },
  Company: {
    ...companyResolvers.Company,
  },
  Game: {
    ...gameResolvers.Game,
  },
  Mutation: {
    ...gameResolvers.Mutation,
    ...userResolvers.Mutation,
  },
};
