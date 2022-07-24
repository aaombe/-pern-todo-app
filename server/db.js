//used to connect to db
const Pool = require('pg').Pool;
const pool = new Pool({
  host: 'localhost',
  user: "postgres",
  password: "1234",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;