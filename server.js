const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')
const cors = require('cors');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    // database : 'fybdb'
  }
});
console.log("hello")
console.log(db)
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/signup', (req, res) => {
    console.log(req.body)
    // res.send("hello world");

})

app.post('/login', (req, res) => {
    console.log(req.body)
    // res.send("hello world");

})



app.listen(5500, ()=> {
    console.log("listening to port 5500");
});