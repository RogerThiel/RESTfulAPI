process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
  const { Pool } = require('pg');
  const connectionString = 'postgres://wbprpxru:yiQx_C9_TLDrrVcjw3iiwG3ELUSgRhtq@balarama.db.elephantsql.com/wbprpxru';
  const pool = new Pool({ connectionString });
  
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