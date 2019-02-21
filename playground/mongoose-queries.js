const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');
const {ObjectID} = require('mongodb')

// var id = "5c6d844f2efd062528b06884";
// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({_id:id}).then((todos)=>{
//     console.log("Todos",todos);
// });

// Todo.findOne({completed:false}).then((todo)=>{
//     console.log("Todo",todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log("Id not found")
//     }
//     console.log("Todo by id",todo);
// }).catch(e=>console.log(e));

// var id = "5c6d844f2efd062528b06884";
// User.findById(id).then((user)=>{
//     if(!user){
//         return console.log("ID not found")
//     };
//     console.log("User with id",user);
// }).catch(e=>console.log(e));