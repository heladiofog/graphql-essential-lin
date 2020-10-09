import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';

const app = express();

// In memory db by now...
class Friend {
  constructor(id, { firstName, lastName, gender, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.language = language;
    this.email = email;
  }
}
// temp db
const friendDatabase = {};
// End temp gb...

app.get('/', (req, res) => {
  console.log("[req.url]", req.url, req.headers.host)
  res.send({ success: true, "message": 'GraphQL is starting!' });
});

// Root resolver:
// const root = { hello: () => "Hallo, Ich bin Hell!" };
const root = {
  friend: () => {
    return {
      "id": 23323,
      "firstName": "Jenny",
      "lastName": "Johns",
      "gender": "Female",
      "language": "English",
      "emails": [
        { email: "jeny@gml.com" },
        { email: "hallo@me.com" }
      ]
    }
  },
  // create resolver
  createFriend: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(8000, () => {
  console.log('Running express server on https://localhost:8000');
});

// Babel -example-node-server
// import http from 'http';

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// }).listen(1337, '127.0.0.1');

// console.log('Server running at http://127.0.0.1:1337');

// export default server;