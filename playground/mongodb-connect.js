const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp',(error,client)=>{
        if(error){
            return console.log('Unable to connect to mongodb server');
        }
        const db = client.db('TodoApp');

        // db.collection('Todos').insertOne({text: 'Something to do',completed:false},(err,result)=>{
        //     if(err){return console.log('Unable to insert Todo',err)}
        //     console.log(JSON.stringify(result.ops,undefined,2));
        // });

        db.collection('Users').insertOne({_id:123, name: 'Robert Johnson',age:25,location:'wallasey'},(err,result)=>{
                if(err){return console.log('Unable to insert Users',err)}
                console.log(JSON.stringify(result.ops,undefined,2));
            });

        client.close();
    });