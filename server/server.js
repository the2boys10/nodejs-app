require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const port = process.env.PORT || 3000;
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate');

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

app.delete("/todos/:id",(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    Todo.findByIdAndDelete({_id: req.params.id}).then(
        todo=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
        },
        err=>res.status(400).send(err)
    )
});

app.patch("/todos/:id",(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(404).send();
    }
    var body = _.pick(req.body,['text','completed']);
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(req.params.id,{$set:body},{new:true}).then(
        todo=>{
            if(!todo){
                return res.status(404).send();
            }
            res.send({todo});
        },
        err=>res.status(400).send(err)
    )
});

app.post("/users",(req,res)=>{
    var userBody = _.pick(req.body, ['email','password']);
    var user = new User(userBody);
    user.save().then(()=>{
        return user.generateAuthToken();
    })
    .then((token)=>{
        res.header('x-auth', token).send(user);
    },(err)=>{res.status(400).send(err)});
});

app.get("/users/me",authenticate,(req,res)=>{
   res.send(req.user);
});

app.post("/users/login",(req,res)=>{
    email = req.body.email;
    password = req.body.password;
    User.findByCredentials(email,password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((err)=>res.status(400).send())
 });

 app.delete("/users/me/token",authenticate,(req,res)=>{
     req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
     },()=>res.status(400).send());
 });


app.listen(port,()=>{
    console.log(`Started server on port ${port}`);
});

module.exports = {app};