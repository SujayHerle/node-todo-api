var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');

var app = express();


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


app.listen(3000,() => {
  console.log("Started on 3000");
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
