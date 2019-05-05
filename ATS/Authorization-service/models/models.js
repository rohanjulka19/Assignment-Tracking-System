const Pool = require('pg').Pool;



const pool = new Pool({

    user: 'Rohan Julka',
    host: 'localhost',
    database: 'User',
    password: '1234',
    port: 5432 ,
});

module.exports = pool ;
