const Pool = require('pg').Pool;

const pool =  new Pool({
    user : 'Rohan',
    host : 'localhost',
    database : 'Quiz',
    password : '1234',
    port : '5432'
});

module.exports = pool ;

