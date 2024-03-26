require('dotenv').config();
const url = require('url');

const { Pool } = require('pg');
const dbUrl = url.parse(process.env.DB_URL);
const auth = dbUrl.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: dbUrl.hostname,
  port: dbUrl.port,
  database: dbUrl.pathname.split('/')[1],
};

const pool = new Pool(config);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query:', err.stack);
  } else {
    console.log('Query result:', res.rows[0]);
  }
  pool.end();
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};