const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;
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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});

  }, (error) => {
    res.status(400).send();
  })
});


app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = {app};

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
