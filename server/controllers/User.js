const _ = require('lodash');

const {User} = require('./../models/User');


var addUser = (req,res)=>{
    var userBody = _.pick(req.body, ['email','password']);
    var user = new User(userBody);
    user.save().then(()=>{
        return user.generateAuthToken();
    })
    .then((token)=>{
        res.header('x-auth', token).send(user);
    },(err)=>{res.status(400).send(err)});
};

var getUserBasedOnToken = (req,res)=>{
    res.send(req.user);
};

var userlogin = (req,res)=>{
    email = req.body.email;
    password = req.body.password;
    User.findByCredentials(email,password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((err)=>res.status(400).send())
};

var logout = (req,res)=>{
    req.user.removeToken(req.token).then(()=>{
       res.status(200).send();
    },()=>res.status(400).send());
};


module.exports = {addUser, getUserBasedOnToken, userlogin, logout};