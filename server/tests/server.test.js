const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var myID = new ObjectID

const todos  = [{
  _id: myID,
  text: `First test todo.`,
  completed: true,
  completedAt: 3333
}, {
  _id: new ObjectID,
  text: 'Second test todo.'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());

});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);     //passing done with return in order to stop
        }                       //further execution of the arrow function

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));

      })
  });

  it('should not create a new todo with invalid body data', (done) => {

    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  })
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
});

describe('GET /todos:id', () => {
  it('should return 404 when invalid object Id is passed', (done) => {

    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done);
  });

  it('should return 404 when non-existant object Id is passed', (done) => {
    var newId = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${newId}`)
      .expect(404)
      .end(done)
  });


    it('should return object when correct object Id is passed', (done) => {

      request(app)
        .get(`/todos/${myID}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done)
    });
});

describe('DELETE /todos/id:', () => {
  it('should remove a todo', (done) => {
    // var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${myID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(myID.toHexString())
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(myID.toHexString()).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((err) => done(err));

      })
  });

  it('should return 404 if todo not found', (done) => {
    var newId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${newId}`)
      .expect(404)
      .end(done)
  });

  it('should return 404 if object ID is invalid', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done);
  });

});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var text = 'New text from test';
    request(app)
      .patch(`/todos/${myID}`)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done)
  });

  it('should clear completedAt when todo is not completed' ,(done) => {
    var text = 'New text from test too'
    request(app)
      .patch(`/todos/${todos[1]._id}`)
      .send({
        text,
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done)
  });

});
