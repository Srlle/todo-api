const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

Todo.findOneAndRemove({_id: '599363b46d27b666e05b8b83'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('599363b46d27b666e05b8b84').then((todo) => {
  console.log(todo);
});
