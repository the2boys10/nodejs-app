const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{
        if(error){
            return console.log('Unable to connect to mongodb server');
        }
        const db = client.db('TodoApp');
        
        db.collection('Users').findOneAndUpdate({_id:new ObjectID("5c6d4152ff544942505a412f")},{$set:{name:'Robert Johnson'},$inc:{age:1}},{returnOriginal:false}).then((result)=>{console.log("result",result)},(err)=>{console.log("error",err)});
    });