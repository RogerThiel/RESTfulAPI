const { Pool } = require('pg');
const connectionString = 'postgres://wbprpxru:yiQx_C9_TLDrrVcjw3iiwG3ELUSgRhtq@balarama.db.elephantsql.com/wbprpxru';
const pool = new Pool({ connectionString });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};