import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

// Mongodb connection
mongoose.Promise = global.Promise;
monsoose.connect('mongodb://localhost/friends', {
  useMongoClient: true,
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false
});

// Schema for Friend entity
const friendSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: Number
  },
  language: {
    type: String
  },
  email: {
    type: String
  },
  contacts: {
    type: Array
  }
});

const Friends = mongoose.model('friends', friendSchema);

// SQL for (sequelize conns)
const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  // file based db
  storage: './aliens.sqlite',
});
// Schema for sql db
const Aliens = sequelize.define('aliens', {
  firstName: { type: Sequelize.String },
  lastName: { type: Sequelize.String },
  planet: { type: Sequelize.String },
});
// Fake data to interact with
Aliens.sync({ force: true }).then(() => {
  _.times(10, (i) => {
    Aliens.create({
      firstName: casual._first_name,
      lastName: casual._last_name,
      planet: casual.word,
    });
  });
});

export { Friends, Aliens };