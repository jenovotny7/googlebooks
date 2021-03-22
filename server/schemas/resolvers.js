const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (p, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('savedBooks');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('Books')
    }
    
  },



  Mutation: {
    addUser: async (p, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },


    login: async (p, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },


    savedBooks: async (p, { bookData }, context) => {
      if (context.user) {
        const nuevoUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return nuevoUser;
      }
      throw new AuthenticationError("Log In!");
    },


    removeBook: async (p, { bookId }, context) => {
      if (context.user) {
        const nuevoUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId: bookId } } },
          { new: true }
        );
        return nuevoUser;
      }
      throw new AuthenticationError("Log in");
    },
  },
};




module.exports = resolvers;