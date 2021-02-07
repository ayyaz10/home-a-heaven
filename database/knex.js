const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);

// whenever you passed in a configuration into knex it creates a new database connection 
module.exports = connection;


