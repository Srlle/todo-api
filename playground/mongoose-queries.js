const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id='5991bb8e337b237c5d9281c511';
//
// if (!ObjectID.isValid(id)) {
//   console.log("Id not valid.");
// }

//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//   if (!todo) {
//     return console.log("Id not found.");
//   }
//   console.log('Todo by Id', todo);
// }).catch((e) => {
//   console.log(e);
// });

var userId = '598b6ea280df75ec52cd590f';

User.findById(userId).then((user) => {
  if (!user) {
    return console.log("User not found.");
  }

  console.log("User:", user);

}).catch((e) => console.log("Error:", e));
