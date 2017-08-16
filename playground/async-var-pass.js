const {Todo} = require('./../server/models/todo');
const {mongoose} = require('./../server/db/mongoose');

var myVar = Todo.findOne().then((todo) => {
  return todo._id;
})

setTimeout(() => console.log("myVar is:", myVar), 2000)
