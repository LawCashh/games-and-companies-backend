import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export default {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error('User doesnt exist');
      const foundUser = await User.findById(user.id);
      if (!foundUser) throw new Error('User doesnt exist');
      return foundUser;
    },
    users: async (_, __, { user }) => {
      if (!user) throw new Error('Unauthenticated');
      if (user.role !== 'OWNER' && user.role !== 'ADMIN')
        throw new Error('Unauthenticated');
      const users = await User.find();
      return users;
    },
  },
  Mutation: {
    register: async (_, { username, password }, { user }) => {
      //ovo je originalno trebalo svako da moze ali sada je vise kao CreateNewUser
      if (!user || user.role !== 'OWNER') {
        return new Error('Unauthorized');
      }
      const existingUser = await User.findOne({ username });
      if (existingUser) throw new Error('Username in use');
      console.log(password);
      const newPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: newPassword,
      });

      await newUser.save();
      return newUser;
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('invalid login');

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('invalid password');

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET,
        { expiresIn: '1d' },
      );
      return {
        token,
        user,
      };
    },
  },
};
