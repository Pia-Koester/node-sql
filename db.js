const { Pool } = require("pg");
const connectionString = process.env.ELEPHANTCONNECTION;

const pool = new Pool({
  connectionString,
});

module.exports = pool;
