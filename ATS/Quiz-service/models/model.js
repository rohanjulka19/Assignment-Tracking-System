const Pool = require('pg').Pool;

const pool =  new Pool({
    user : 'Rohan',
    host : 'localhost',
    database : 'QuizDB',
    password : '1234',
    port : '5432'
});

module.exports = pool ;

