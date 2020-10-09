import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import resolvers from './resolvers/friendResolvers';

const app = express();

app.get('/', (req, res) => {
  console.log("[req.url]", req.url, req.headers.host)
  res.send({ success: true, "message": 'GraphQL is starting!' });
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
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