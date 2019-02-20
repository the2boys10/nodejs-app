const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post("/todos",(req,res)=>{
    var todo = new Todo({text:req.body.text});
    todo.save().then((doc)=>{res.send(doc)},(err)=>{res.status(400).send(err)});
});

app.get("/todos",(req,res)=>
    Todo.find().then((todos)=>{res.send({todos})},(e)=>{res.status(400).send(err)})
);

app.get("/todos/:id",(req,res)=>
{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }

    Todo.findById({_id: req.params.id}).then(
        todo=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
        },
        err=>res.status(400).send(err)
    )
});

app.listen(3000,()=>{
    console.log("Started server on port 3000");
});

module.exports = {app};