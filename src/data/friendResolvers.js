import { Friends } from '../data/dbConnectors';

// resolver Map from graphql-tools
export const resolvers = {
  Query: {
    // get Friend by Id
    getAllFriends: () => {
        return Friends.find();
    },
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
        lastName: input.lastName,
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
    // update a friend
    updateFriend: (root, { input }) => {
      return new Promise((resolve, reject) => {
        Friends.findByIdAndUpdate(input.id, input, { new: true }, (err, friend) => {
          if (err) reject(err);
          else resolve(friend);
        });
      });
    },
    // delete a friend
    deleteFriend: (root, { id }) => {
      return new Promise((resolve, reject) => {
        Friends.remove({ _id: id }, (err) => {
          if (err) reject(err);
          else resolve('Successfully deleted friend :/');
        })
      })
    }
  }
};
