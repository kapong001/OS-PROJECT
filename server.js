const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000 

app.use(cors())
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const { MongoClient } = require("mongodb");
const uri = "mongodb://mongo:27017";
//Create
app.post('/users/create', async(req, res) => {
  const user = req.body;
  const client = new MongoClient(uri);
  await client.connect();
  await client.db('test').collection('users').insertOne({
    id: parseInt(user.id),
    fname: user.fname,
    lname: user.lname,
    party: user.party,
  });
  await client.close();
  res.status(200).send({
    "status": "ok",
    "message": "รหัสนักศึกษา "+user.id+" ลงทะเบียนสำเร็จ ฝ่าย "+ user.party,
    "user": user
  });
})
//Read all
app.get('/users', async(req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const users = await client.db('test').collection('users').find({}).toArray();
    await client.close();
    res.status(200).send(users);
  })
//Read by id
app.get('/users/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('test').collection('users').findOne({"id": id});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "user": user
    });
  })
//Update
app.put('/users/update', async(req, res) => {
    const user = req.body;
    const id = parseInt(user.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('test').collection('users').updateOne({'id': id}, {"$set": {
      id: parseInt(user.id),
      fname: user.fname,
      lname: user.lname,
      party: user.party,
    }});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "รหัสนักศึกษา "+id+" แก้ไขสำเร็จ",
      "user": user
    });
  })
//Delete
app.delete('/users/delete', async(req, res) => {
    const id = parseInt(req.body.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('test').collection('users').deleteOne({'id': id});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "รหัสนักศึกษา "+id+" ถูกลบ"
    });
  })