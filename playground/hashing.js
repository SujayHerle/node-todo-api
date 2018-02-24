const {SHA256} = require('crypto-js');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var data = {
  id:10
};

var token=jwt.sign(data,'123abc');
console.log(token);

var decoded=jwt.verify(token,'123abc');
console.log(decoded);

var password='123abc';
/*bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});*/

var hashPassword='$2a$10$87u3ZNJ1bhK5XJgwTtiiF.qssDf61REU7PwtdnB8XQ1ETkcSgpiWC';
bcrypt.compare(password,hashPassword,(err,res)=>{
  console.log(res);
});


/*var message='Iam usernumber';
var hash=SHA256(message).toString();

console.log(message);
console.log(hash);

var data = {
  id:4
};

var token={
  data,
  hash:SHA256(JSON.stringify(data)+'secret').toString()
}

token.data_id=5;
token.hash=SHA256(JSON.stringify(token.data)).toString();


var resultHash=SHA256(JSON.stringify(token.data)+'secret').toString();
if(resultHash===token.hash){
  console.log('Data notr hcanged')
}
else{
  console.log('Dont trust data changed');
}
*/
