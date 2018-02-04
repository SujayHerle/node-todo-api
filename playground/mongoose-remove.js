const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

/*Todo.remove({}).then((result)=>{
  console.log(result);
});*/

//Todo.findOneAndRemove({_id:'2882'});

Todo.findByIdAndRemove('5a75ac44079ab41e7899294e').then((todo)=>{
  console.log(todo);
});
