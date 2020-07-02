
var pool = require('../database/mysql'); //reference of dbconnection.js  
var empquery = {

    getEmployee: function (id, callback) {
        return pool.query("select * from employees where id=?", [id], callback);
    },
    addEmployee: function ([id, name, salary, age], callback) {
        return pool.query('INSERT INTO employees SET id=?,`name`=?,`salary`=?,`age`=?', [id, name, salary, age], callback);
    },
    deleteEmployee: function (id, callback) {
        return pool.query("delete from employees where id=?", [id], callback);
    },
    updateEmployee: function ([name, age, salary, id], callback) {
        return pool.query("UPDATE `employees` SET `name`=?,`salary`=?,`age`=? where `id`=?", [name, age, salary, id], callback);
    }
};
module.exports = empquery;  
