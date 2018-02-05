const _=require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');

var app = express();
const port=process.env.PORT||3000;


app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  var todo = new Todo({
    text:req.body.text
  });

  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos})
  },(e)=>{
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findById(id).then((todos)=>{
    if(!todos){
      return res.status(404).send();
    }
    //res.send(JSON.stringify(todos,undefined,2));
    res.send({todos});
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todos)=>{
    if(!todos){
      return res.status(404).send();
    }
    //res.send(JSON.stringify(todos,undefined,2));
    res.status(200).send({todos});
  }).catch((e)=>{
    res.status(400).send();
});
});

app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
})


app.listen(port,() => {
  console.log(`Started on ${port}`);
});

module.exports = {app};































/*var newTodo = new Todo({text:'Cook Dinner'});

newTodo.save().then((doc)=>{
  console.log('Saved Doc ',doc);
},(e)=>{
  console.log('Unable to save ',e);
});
var otherTodo = new Todo({text:'Cook Dinner',
completed:true,
completedAt:123});

otherTodo.save().then((doc)=>{
  console.log('Saved Doc ',doc);
},(e)=>{
  console.log('Unable to save ',e);
});



var user = new User({email:'  abcd@gmail.com    '});
user.save().then((doc)=>{
  console.log('Saved Doc ',doc);
},(e)=>{
  console.log('Unable to save ',e);
});*/
