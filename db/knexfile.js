// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'fypdb'
      // 'postgres://localhost/fypdb'
    }
  }
};