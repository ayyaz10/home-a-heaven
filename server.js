const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const auth = require('./auth');




const { 
  PORT = 5500,
 } = process.env;


const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'fypdb'
  }
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('process.env.COOKIE_SECRET'));
app.use(express.static('public'));
app.use(cors());

app.use('/auth', auth);


app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    db.select().table('product_category')
    .then(data => {
      res.render('index', {
        category: data
      });
    })
});

app.get('/adminPanel', (req, res) =>{
  res.render('adminPanel')
})

app.get('/signup-login', (req, res) => {
  db.select().table('product_category')
  .then(data => {
    res.render('signup-login', {
      category: data
    });
  })
})


// app.post('/register', (req, res) => {
//   const { email, password, firstname, lastname} = req.body;
  
//   bcrypt.genSalt(10, function(err, salt) {
//       bcrypt.hash(password, salt, function(err, hash) {
//         db.transaction(trx => {
//           trx.insert({
//             hash: hash, 
//             email: email
//           })
//           .into('login')
//           .returning('email')
//           .then(loginEmail => {
//             return trx('customer')
//             .returning('*')
//             .insert({
//               email: loginEmail[0],
//               first_name: firstname,
//               last_name: lastname,
//               created_on: new Date()
//             }).then(cust => {
//               if(cust[0]){
//                 return res.json(true);
//               }
//             })
//           })
//           .then(trx.commit)
//           .catch(trx.rollback)
//         })
//         .catch(err => res.json(false));
//       });
//   });
// });


// app.post('/login', (req, res) => {
//   const { email, password} = req.body;
// 	db.select('email', 'hash').from('login')
// 	.where('email', '=', email)
// 	.then(data => {
// 		bcrypt.compare(password, data[0].hash, (err, isValid) => {
// 			if(isValid){
// 				db.select('*').from('customer')
// 				.where('email', '=', email)
// 				.then(customerData => {
//           if(customerData[0]){
//            return res.json(true);
//           }
//         })
//         .catch(err => res.status(400).json('unable to login'))
// 			} else {
// 				res.status(400).json(false)
// 			}
//     })
// 	})
//   .catch(err => res.status(400).json('wrong credentials'))

// })


// app.post('/category', (req, res) => {
//     const { categoryname } = req.body;
//     db('product_category')
//     .returning('category_name')
//     .insert({
//       category_name: categoryname
//     })
//     .then(category_name =>{
//       if(category_name[0] === categoryname){
//         return res.json(true);
//       } else {
//         return res.json(false);
//       }
//     })
//     .catch(err => console.log(err))
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');

  res.json({
    message: err.message,
    error: res.locals.error = req.app.get('env') === 'development' ? err : {}
  });
});



app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`);
});

