const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id='5a14631c2daf8813a0fa130b';
//'5a23bf44dacd3627f0b1cfb2';

/*if(!ObjectID.isValid(id)){
  console.log('ID not valid');
}

Todo.find({
  _id:id
}).then((todos)=>{
  console.log('Todos ',todos);
});

Todo.findOne({
  _id:id
}).then((todo)=>{
  console.log('Todo ',todo);
});

Todo.findById({
  _id:id
}).then((todo)=>{
  console.log('By Id ',todo);
}).catch((e)=>console.log(e));*/
////////////////////////////////////////////////////
/*User.find({
  _id:id
}).then((users)=>{
  console.log('Users ',users);
});

User.findOne({
  _id:id
}).then((user)=>{
  console.log('User ',user);
});*/

User.findById('5a14631c2daf8813a0fa130b').then((user)=>{
    if(!user){
      return console.log('Usernot found');
    }
    console.log(JSON.stringify(user,undefined,2));
},(e)=>{
  console.log(e);
});
