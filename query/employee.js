class employee {
    
    constructor(id,name,salary,age) {
        this.id=id;
        this.name=name;
        this.salary=salary;
        this.age=age;

    }

    addemployee() {
        let sql = `INSERT INTO employee(id,name, salary,age) \
                   VALUES('${this.prd_name}','${this.name}','${this.salary}','${this.age}')`;
        return sql;           
    }

    static getemployee(id) {
        let sql = `select * from employee where id=?', [req.query.id]`;
        return sql;           
    }

    static deleteemployee(id) {
        let sql = `DELETE FROM employee WHERE id = ${id}`;
        return sql;           
    }

    updateemployee() {
        let sql = `UPDATE employee SET name = ${this.name} , salary=${this.salary}, age = ${this.age} where id=${id}`;
        return sql;              
    }    
}

module.exports = employee;