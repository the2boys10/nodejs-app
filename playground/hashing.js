const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var password = '123abc!';

// bcrypt.genSalt(10,(err, salt)=>{
//     bcrypt.hash(password,salt,(err, hash)=>{
//         console.log(hash);
//     });
// });


// var hashedPassword = '$2a$10$hY6QXcCjShyUpuBdP3TcEefSclJNcbpc403zfasWvoUahH4NlLaX.';
// bcrypt.compare("123abc!", hashedPassword,(err,res)=>{
//     console.log(res);
// });








var data = {
    id: 10
};

var data2 = {
    id: 11
};

var token = jwt.sign(data,'123abc',{expiresIn:"5s"}).toString();
var token2 = jwt.sign(data2,'123abc',{expiresIn:"5s"}).toString();
console.log(token);
setTimeout(()=>{var decoded = jwt.verify(token2,"123abc");
console.log('docoded',decoded);
},2000);










// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}\n Hash: ${hash}`)

// var data = {
//     id: 4
// };
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString;

// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if(resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed');
// }