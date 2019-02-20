const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{
        if(error){
            return console.log('Unable to connect to mongodb server');
        }
        const db = client.db('TodoApp');
        
        // db.collection('Todos').find({_id:new ObjectID('5c6d5836716c4c4200f1dd0c')}).toArray().then(
        //     docs=>console.log(JSON.stringify(docs,undefined,2)),
        //     err=>console.log("Unable to fetch todos",err));

        db.collection('Todos').find().count().then(
            count=>console.log(`Todos count ${count}`),
            err=>console.log("Unable to fetch todos",err));

        db.collection('Users').find({name:'Andrew'}).toArray().then(
            docs=>console.log(`Todos ${JSON.stringify(docs,undefined,2)}`),
            err=>console.log("Unable to fetch todos",err));
    });