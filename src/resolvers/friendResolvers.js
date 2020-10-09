// In memory db by now...
class Friend {
  constructor(id, { firstName, lastName, gender, age, language, email, contacts }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.language = language;
    this.email = email;
    this.contacts = contacts;
  }
}
// temp db
const friendDatabase = {};
// End temp gb...

// reolver Map from graphql-tools
export const resolvers = {
  Query: {
    // get Friend by Id
    getFriend: ({ id }) => {
      return new Friend(id, friendDatabase[id]);
    },
  },
  Mutation: {
    // create resolver
    createFriend: ({ input }) => {
      let id = require('crypto').randomBytes(10).toString('hex');
      friendDatabase[id] = input;
      return new Friend(id, input);
    },
  }
};
