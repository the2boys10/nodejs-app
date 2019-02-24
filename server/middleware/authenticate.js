var {User} = require('./../models/User');
const jwt = require('jsonwebtoken');

var authenticate = (req,res,next) =>{
    var token = req.header('x-auth');
    var userId;
    try
    {
        var userId = jwt.verify(token,process.env.JWT_SECRET);
    }catch(e){
        return res.status(401).send();
    }
    if(userId)
    {
        User.findByToken(token).then((user)=>{
            if(!user){
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();
        }).catch((e)=>{res.status(401).send()})
    }
};

module.exports = {authenticate};