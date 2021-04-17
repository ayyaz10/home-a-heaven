require('dotenv').config();
const router = require('./routes');
const path = require('path')
const knex = require('knex');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

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
  resave: true,
  store,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, //24 hours
   }
}))

app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Global Middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
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

// catch 404 and forward to error handler
const { getAllCategories } = require('./db/queries');
app.use(async function(req, res, next) {
      const categories = await getAllCategories();
      res.render('404', {
        categories
      })
  // var err = new Error('Not Found');
  // err.status = 404;
  next();
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

