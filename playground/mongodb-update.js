//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Connection Failed');
  }
  console.log('Connected to DB');
/*db.collection('Todos').findOneAndUpdate({completed:false},{$set:{
  completed:true
}},{
  returnOriginal:false
}).then((result)=>{

  console.log(result);
});*/

db.collection('Users').findOneAndUpdate({name:'Mike'},{$inc:{
  age:1
}},{
  returnOriginal:false
}).then((result)=>{

  console.log(result);
});
  //db.close();
});
