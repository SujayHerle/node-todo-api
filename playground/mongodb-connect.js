//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');
var obj=new ObjectId();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Connection Failed');
  }
  console.log('Connected to DB');

  /*db.collection('Todos').insertOne({
    text:'something to do',
    completed:false
  },(err,res)=>{
    if(err){
      return console.log('Unable to inser',err);
    }
    console.log(JSON.stringify(res.ops,undefined,2));
  });*/
  db.collection('Users').insertOne({
    name:'Sujays',
    age:29,
    location:'Saligrama'
  },(err,res)=>{
    if(err){
      return console.log('Unable to inser',err);
    }
    console.log(JSON.stringify(res.ops,undefined,2));
  });
  db.close();
});
