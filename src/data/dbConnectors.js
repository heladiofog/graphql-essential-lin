import mongoose from 'mongoose';

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

export { Friends };