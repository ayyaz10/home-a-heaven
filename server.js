const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'fypdb'
  }
});

// db.select('*').from('admin').then(data => {
// 	console.log(data)
// }).catch(err => console.log(err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/signup', (req, res) => {
  const { email, password, firstname, lastname} = req.body;
  
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        db.transaction(trx => {
          trx.insert({
            hash: hash, 
            email: email
          })
          .into('login')
          .returning('email')
          .then(loginEmail => {
            return trx('customer')
            .returning('*')
            .insert({
              email: loginEmail[0],
              first_name: firstname,
              last_name: lastname,
              created_on: new Date()
            }).then(cust => {
              res.json(cust[0]);
            })
          })
          .then(trx.commit)
          .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'));

      });
  });
});


app.post('/login', (req, res) => {
  const { email, password} = req.body;
	db.select('email', 'hash').from('login')
	.where('email', '=', email)
	.then(data => {
		bcrypt.compare(password, data[0].hash, (err, isValid) => {
			if(isValid){
				db.select('*').from('customer')
				.where('email', '=', email)
				.then(customerData => {
					res.json(customerData[0])
        })
        .catch(err => res.status(400).json("unable to get user"))
			} else {
				res.status(400).json('wrong credentials')
			}
    })
	})
	.catch(err => res.status(400).json('error getting user'))
})



app.listen(5500, ()=> {
    console.log("listening to port 5500");
});