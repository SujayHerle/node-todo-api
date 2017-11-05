//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Connection Failed');
  }
  console.log('Connected to DB');

db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
  console.log(result);
});

db.collection('Todos').deleteOne({text:'Drink Water'}).then((result)=>{
  console.log(result);
});

db.collection('Todos').findOneAndDelete({_id:new ObjectId('59fed1338d734b10b881aa39')}).then((result)=>{
  console.log(result);
});
  //db.close();
});
