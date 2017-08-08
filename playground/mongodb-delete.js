// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err) {
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server');

  //deleteMany
  // db.collection('Todos').deleteMany({text: "Do random stuff"}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result.result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  //Challenge: Delete multiple users with name: "Srdjan" and a single user based on _id

  // db.collection('Users').deleteMany({name: 'Srdjan'}).then((result) => {
  //   console.log(result.result);
  // });

  // db.collection('Users').findOneAndDelete({_id: new ObjectID("598875430bf55f3f1c7a0274")}).then((result) => {
  //   console.log(result.value);
  // });

  // db.close();
});
