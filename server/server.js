var express = require('express');
var bodyParser = require('body-parser');

var {mognoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});



// var newTodo = new Todo({
//   text: "Eat lunch",
//   completed: false,
//   completedAt: 0
// });

// var newTodo = new Todo({
//   text: "  Eat more lunch  "
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo.', doc);
// }, (err) => {
//   console.log('Unable to save todo.');
// });

// var newUser = new User({
//   email: " meecha@reaktor.tech  "
// });
//
// newUser.save().then((doc) => {
//   console.log('Saved user.', doc);
// }, (err) => {
//   console.log('Unable to save user.', err);
// });
