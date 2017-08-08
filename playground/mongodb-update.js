// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server');

//   db.collection('Todos').findOneAndUpdate({
//     _id: new ObjectID("59899cadc4baa0e8b1aba407")
//   }, {
//     $set: {
//       completed: false
//     }, {
//     }
//     returnOriginal: false
//   }).then((result) => {
//   console.log(result.value);
// });

db.collection('Users').findOneAndUpdate({
  name: "Joško"
}, {
  $set: {
    name: "Srdjan"
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result.value);
});

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("59887404184eda2104259c6a")
}, {
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result.value);
});

  // db.close();
});
