const { Pool } = require('pg');
const connectionString = 'Ihr-ElephantSQL-Verbindungsstring';
const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};