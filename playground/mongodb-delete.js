const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{
        if(error){
            return console.log('Unable to connect to mongodb server');
        }
        const db = client.db('TodoApp');
        

        //delete many
        // db.collection('Todos').deleteMany({text:'Eat lunch',}).then((result)=>{console.log("result",result)},(err)=>{console.log("error",err)})

        //deleteone
        // db.collection('Todos').deleteOne({text:'Eat lunch',}).then((result)=>{console.log("result",result)},(err)=>{console.log("error",err)})

        //findoneanddelete
        // db.collection('Todos').findOneAndDelete({completed:false,}).then((result)=>{console.log("result",result)},(err)=>{console.log("error",err)})

        // db.collection('Users').deleteMany({name:'Andrew'}).then((result)=>{console.log("result",result)},(err)=>{console.log("error",err)});
        
        // db.collection('Users').findOneAndDelete({_id:new ObjectID("5c6d41f3e74acd1b74e7de51")}).then((result)=>{console.log("result",result)},(err)=>{console.log("error",err)})
    });