const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
    var todo = new Todo({text:req.body.text});
    todo.save().then((doc)=>{res.send(doc)},(err)=>{res.status(400).send(err)});
});

// app.get("/todos",(req,res)={

// })

app.listen(3000,()=>{
    console.log("Started server on port 3000");
});