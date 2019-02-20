const {assert} = require("chai");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/Todo");

// gets rid of all todo's
beforeEach((done)=>{
    Todo.deleteMany().then(()=>done());
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

            Todo.find().then((result)=>{
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
                assert.equal(result.length,0);
                done();
            }).catch(e=> done(e));
        });
    });
});