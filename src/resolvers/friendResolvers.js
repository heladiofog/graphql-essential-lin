
// In memory db by now...
class Friend {
  constructor(id, { firstName, lastName, gender, age, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.language = language;
    this.email = email;
  }
}
// temp db
const friendDatabase = {};
// End temp gb...

// (Root) resolvers: A resolver is a function that respond to queries or mutations
// const root = { hello: () => "Hallo, Ich bin Hell!" };
const resolvers = {
  getFriend: ({ id }) => {
    return new Friend(id, friendDatabase[id]);
  },
  // create resolver
  createFriend: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

export default resolvers;