import mongoose from 'mongoose';
import { Friends } from '../data/friendResolvers';

// resolver Map from graphql-tools
export const resolvers = {
  Query: {
    // get Friend by Id
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    // create resolver
    createFriend: (root, { input }) => {
      const newFriend = new Friends({
        firstName: input.firstName,
        lastName: input.latName,
        gender: input.gender,
        age: input.age,
        language: input.language,
        email: input.email,
        contacts: input.contacts,
      });
      // assigning an ID
      newFriend.id =  newFriend._id;
      // return a new promise for waiting for the response
      return new Promise((resolve, reject) => {
        newFriend.save((err, friend) => {
          if (err) reject(err);
          else resolve(friend);
        });
      });
      // return newFriend;
    },
  }
};

