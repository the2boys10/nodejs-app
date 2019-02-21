const {assert} = require("chai");
const request = require("supertest");
const {ObjectID} = require('mongodb');

const {app} = require("./../server");
const {Todo} = require("./../models/Todo");

const todos = [{_id:new ObjectID(),text:'First test todo'},{_id:new ObjectID(),text:'Second test todo', completed:true, completedAt: 333},{_id:new ObjectID(),text:'Third test todo'}]

// gets rid of all todo's
beforeEach((done)=>{
    Todo.deleteMany().then(()=>Todo.insertMany(todos)).then(()=>done());
});

describe("POST /todos", ()=>{
    it("should create a new todo",(done)=>{
        var text = "text";
        request(app).post('/todos').send({text}).expect(200).expect((res)=>{
            assert.deepEqual(res.body.text,text);
        }).end((err, res)=>{
            if(err){
                return done(err);
            }

            Todo.find({text}).then((result)=>{
                assert.equal(result.length,1);
                assert.equal(result[0].text,text);
                done();
            }).catch(e=> done(e));
        });
    });

    it("should not create a new todo",(done)=>{
        var text = "";
        request(app).post('/todos').send({text}).expect(400).end((err, res)=>{
            if(err){
                return done(err);
            }

            Todo.find().then((result)=>{
                assert.equal(result.length,3);
                done();
            }).catch(e=> done(e));
        });
    });
});

describe("GET /todos", ()=>{
    it("should get all todos",(done)=>{
        request(app).get('/todos').expect(200).expect((res)=>{
            assert.equal(res.body.todos.length,3);
        })
        .end(done);
    });
});

describe("GET /todos:id", ()=>{
    it("should get requested todo doc",(done)=>{
        request(app).get(`/todos/${todos[0]._id.toHexString()}`).expect(200).expect((res)=>{
            assert.equal(res.body.todo.text,todos[0].text);
        })
        .end(done);
    });

    it("should return 404 if todo not found",(done)=>{
        request(app).get(`/todos/${new ObjectID()}`).expect(404)
        .end(done);
    });

    it("should return 400 if todo id is invalid",(done)=>{
        request(app).get(`/todos/1}`).expect(404)
        .end(done);
    });
});

describe("DELETE /todos:id", ()=>{
    it("should delete requested todo doc",(done)=>{
        request(app).delete(`/todos/${todos[0]._id.toHexString()}`).expect(200).expect((res)=>{
            assert.equal(res.body.todo.text,todos[0].text);
            Todo.findById(todos[0]._id.toHexString()).then((result)=>{
                assert.equal(result,null);
            }).catch(e=> done(e));
        })
        .end(done);
    });

    it("should return 404 if todo not found",(done)=>{
        request(app).delete(`/todos/${new ObjectID()}`).expect(404)
        .end(done);
    });

    it("should return 400 if todo id is invalid",(done)=>{
        request(app).delete(`/todos/1}`).expect(404)
        .end(done);
    });
});

describe("PATCH /todos:id", ()=>{
    it("should update requested todo doc",(done)=>{
        request(app).patch(`/todos/${todos[0]._id.toHexString()}`).send({text:"abc",completed:true}).expect(200).expect((res)=>{
            assert.equal(res.body.todo.text,"abc");
            assert.equal(res.body.todo.completed,true);
            assert.notEqual(res.body.todo.completedAt,undefined);
            assert.equal(typeof res.body.todo.completedAt, 'number')
            Todo.findById(todos[0]._id.toHexString()).then((result)=>{
                assert.equal(result.text,"abc");
                assert.equal(result.completed,true);
                assert.notEqual(result.completedAt,undefined);
                assert.equal(typeof result.completedAt, 'number')
            }).catch(e=> done(e));
        })
        .end(done);
    });

    it("should clear completedAt when todo is not completed",(done)=>{
        request(app).patch(`/todos/${todos[1]._id.toHexString()}`).send({text:"abc2",completed:false}).expect(200).expect((res)=>{
            assert.equal(res.body.todo.text,"abc2");
            assert.equal(res.body.todo.completed,false);
            assert.equal(res.body.todo.completedAt,null)
            Todo.findById(todos[1]._id.toHexString()).then((result)=>{
                assert.equal(res.body.todo.text,"abc2");
                assert.equal(res.body.todo.completed,false);
                assert.equal(res.body.todo.completedAt,null)
            }).catch(e=> done(e));
        })
        .end(done);
    });

    it("should return 404 if todo not found",(done)=>{
        request(app).patch(`/todos/${new ObjectID().toHexString()}`).send({text:"abc2",completed:false}).expect(404)
        .end(done);
    });

    it("should return 400 if todo id is invalid",(done)=>{
        request(app).patch(`/todos/1}`).send({text:"abc2",completed:false}).expect(404)
        .end(done);
    });
});