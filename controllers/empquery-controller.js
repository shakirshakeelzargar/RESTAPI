  
var pool = require('../database/mysql'); //reference of dbconnection.js  
var empquery = {  
   
    getEmployee: function(id, callback) {  
        return pool.query("select * from employee where Id=?", [id], callback);  
    },  
    addEmployee: function([id, name, salary, age], callback) {  
        return pool.query('INSERT INTO employee SET id=?,`name`=?,`salary`=?,`age`=?', [id, name, salary, age], callback);  
    },  
    deleteEmployee: function(id, callback) {  
        return pool.query("delete from employee where Id=?", [id], callback);  
    },  
    updateEmployee: function([name,age,salary,id], callback) {  
        return pool.query("UPDATE `employee` SET `name`=?,`salary`=?,`age`=? where `id`=?", [name,age,salary,id], callback);  
    }  
};  
module.exports = empquery;  
