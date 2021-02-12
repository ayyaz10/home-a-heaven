const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
// const ejs = require('ejs')
const env = require('dotenv')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const auth = require('./auth');
const authMiddleware = require('./auth/middleware');


const { 
  PORT = 5500,
  COOKIE_SECRET = 'HELLO'
 } = process.env;


const db = knex({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : '1234',
    database : 'fypdb'
  }
});

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(cookieParser(COOKIE_SECRET));
app.use(cors({
  credentials: true
}));

app.use('/auth', auth);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    db.select().table('product_category')
    .then(data => {
      res.render('guest', {
        category: data,
      });
    })
});

app.get('/authorizedUser', authMiddleware.ensureLoggedIn, (req, res) => {
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

app.post('/category', (req, res) => {
    const { categoryname } = req.body;
    db('product_category')
    .returning('category_name')
    .insert({
      category_name: categoryname
    })
    .then(category_name =>{
      if(category_name[0] === categoryname){
        return res.json(true);
      } else {
        return res.json(false);
      }
    })
    .catch(err => console.log(err))
})

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
  res.status(err.status || res.statusCode || 500);
  // res.render('error');

  res.json({
    message: err.message,
    error: res.locals.error = req.app.get('env') === 'development' ? err : {}
  });
});



app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`);
});

