const Pool = require('pg').Pool;

const pool = new Pool({
    user : "postgres",
    password : "password",
    hose : "localhost",
    port : 5432,
    database : "CRICTOUR"
});

module.exports = pool;
