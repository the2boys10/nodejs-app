const {Todo} = require('./../models/Todo');
const {ObjectID} = require('mongodb');
const _ = require('lodash');



var createTodo = (req,res)=>{
    var todo = new Todo({text:req.body.text,_creator:req.user._id});
    todo.save().then((doc)=>{res.send(doc)},(err)=>{res.status(400).send(err)})
};

var getTodos = (req,res)=> Todo.find({_creator:req.user._id}).then((todos)=>{res.send({todos})},(e)=>{res.status(400).send(err)});

var getTodo = (req,res)=>
{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Todo.findOne({_id: req.params.id,_creator:req.user._id}).then(
        todo=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
        },
        err=>res.status(400).send(err)
    );
};


var deleteTodo = (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Todo.findOneAndDelete({_id: req.params.id,_creator: req.user._id}).then(
        todo=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
        },
        err=>res.status(400).send(err)
    );
};

var updateTodo = (req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    var body = _.pick(req.body,['text','completed']);
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    };
    Todo.findOneAndUpdate({_id:req.params.id,_creator:req.user._id},{$set:body},{new:true}).then(
        todo=>{
            if(!todo){
                return res.status(404).send();
            };
            res.send({todo});
        },
        err=>res.status(400).send(err)
    );
};

module.exports = {createTodo, getTodos, getTodo, deleteTodo, updateTodo};