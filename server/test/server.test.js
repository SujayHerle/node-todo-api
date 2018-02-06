const expect = require('expect');
const request = require('supertest');
const {ObjectID}=require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');
//const {app} = require('./../server.js');

const todos = [{
  _id:new ObjectID(),
  text:'First test'
},{
  _id:new ObjectID(),
  text:'Second Test',
completed:true,
completedAt:333}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done()) ;
});

describe('POST /todos', ()=>{
  it('should create a new Todo',(done)=>{
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text)
    })
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find({text}).then((todos)=>{
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=>done(e));
    });
  });

  it('Should not create a new Todo', (done)=>{
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err,res) => {
      if(err){
        return done(err);
      }
      Todo.find().then((todos)=>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e)=>done(e));
    });
  });


});

describe('GET /todos',()=>{
  it('Should GET all Todo',(done)=>{
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.length).toBe(2);
    })
    .end(done)
  });
});

describe('GET /todos/:id',()=>{
  it('should return todo doc',(done)=>{
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 ifor non-object ids',(done)=>{
    //var hexID= new ObjectID().toHexString();
    request(app)
    .get(`/todos/1234`)
    .expect(404)
    .end(done);
  });

});

describe('DELETE /todos/:id',()=>{
  it('Delete doc',(done)=>{
    var hexID= todos[1]._id.toHexString()
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos._id).toBe(hexID);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.findById(hexID).then((todo)=>{
        expect(null);
        done();
      }).catch((e)=>done(e));
    });
  });
  it('should return 404 if todo not found',(done)=>{
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos/:id',()=>{
  it('Patch doc',(done)=>{
    var hexID= todos[1]._id.toHexString()
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todos._id).toBe(hexID);
    })
    .end((err,res)=>{
      if(err){
        return done(err);
      }
      Todo.findById(hexID).then((todo)=>{
        expect(null);
        done();
      }).catch((e)=>done(e));
    });
  });
  it('should return 404 if todo not found',(done)=>{
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if todo not found',(done)=>{
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });
});
