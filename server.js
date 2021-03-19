require('dotenv').config();
// const db = require('./db/knexfile');
const flash = require('express-flash');
const router = require('./routes');
const path = require('path')
const bodyParser = require('body-parser');
const knex = require('knex');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const express = require('express');
const app = express();

const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const authMiddleware = require('./controller/auth/middleware');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'fypdb'
  }
})

const {
  PORT = 3333,
  // COOKIE_SECRET = 'HELLO'
 } = process.env;



const store = new KnexSessionStore({
  knex: db,
  clearInterval : 1000 * 60 * 60 * 24, // removes session id from database
  // after 24 hours
});


app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, //24 hours
   }
}))

// app.use(flash());


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  // console.log(req.session.cart.items[51].item.product.image)
  next();
})

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
  credentials: true
}));
// app.use(expressLayout)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(router);

// app.use('/', (req, res) => {
//   const n = req.session.views || 0;
//   req.session.views = n + 1;
//   console.log(n)
//   res.end(`${n} views`);
// });

app.get('/product', (req, res) => {
  db.select().table('product_category')
  .then(data => {
    res.render('products', {
      category: data
    });
  });
})

// app.get('/authorizedUser', authMiddleware.ensureLoggedIn, (req, res) => {
//   db.select().table('product_category')
//   .then(data => {
//     res.render('index', {
//       category: data
//     });
//   });
// });

// app.get('/adminPanel', (req, res) =>{
//   res.render('adminPanel');
// })


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

