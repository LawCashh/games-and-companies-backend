import GameSchema from './Game.js';
import CompanySchema from './Company.js';
import UserSchema from './User.js';

const rootSchema = `
    type Query {
        companies: [Company!]!
        games: [Game!]!
        me: User
        users: [User]!
    }
    type Mutation { 
        addGame(title: String!, releaseYear: Int!, companyId: String): Game
        login(username: String!, password: String!): AuthPayload!
        register(username: String!, password: String!): User!
    }
`;

export default [CompanySchema, GameSchema, UserSchema, rootSchema].join('');
