//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectId}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
  if(err){
    return console.log('Connection Failed');
  }
  console.log('Connected to DB');

  /*db.collection('Todos').find({_id:new ObjectId('59feb9267ef4f71898e85464')}).toArray().then((docs)=>{
    console.log('Todos');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log("Erroe",err);
  });

  db.collection('Todos').find().count().then((count)=>{
    console.log('Todos count '+count);
    //console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log("Erroe",err);
  });*/
  db.collection('Users').find({name:'Sujay'}).toArray().then((docs)=>{
    console.log('Users');
    console.log(JSON.stringify(docs,undefined,2));
  },(err)=>{
    console.log("Erroe",err);
  });

  //db.close();
});
