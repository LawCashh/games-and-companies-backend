import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js';
dotenv.config();

// eslint-disable-next-line no-undef
const mongoUri = process.env.MONGO_URI.replace(
  '<password>',
  // eslint-disable-next-line no-undef
  process.env.MONGO_PASS,
);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
  context: ({ req }) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.replace('Bearer ', '');
      try {
        // eslint-disable-next-line no-undef
        const user = jwt.verify(token, process.env.SECRET);
        return { user };
      } catch (err) {
        console.log('invalid token');
      }
    }
  },
});

console.log(`🚀  Server ready at: ${url}`);
