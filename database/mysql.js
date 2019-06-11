var mysql      = require('mysql');


const pool = mysql.createPool({


    host: 'northside.in',
    user: 'shakir',
    password: 'shakir123',
    database: 'shakir_test'
});


module.exports = pool;