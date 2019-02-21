const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');
const {ObjectID} = require('mongodb')

// Todo.().then((result)=>{console.log(result)},(err)=>{console.log(err)});
// Todo.findOneAndDelete({_id: '5c6e710ca0e1474484e142fd'}).then((result)=>{console.log(result)},(err)=>{console.log(err)});
// Todo.findByIdAndDelete("5c6e710ca0e1474484e142fd").then((result)=>{console.log(result)},(err)=>{console.log(err)});