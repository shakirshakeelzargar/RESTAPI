var express = require("express")
var pool = require("../database/mysql")
var employee = require("../query/employee")
var empauth=require("../auth/empauth").otherMethod
const methodOverride = require('method-override');


const router = express.Router();
router.use(methodOverride('_method'));



router.get('/',empauth, function (req, res, ) {
    console.log(req.query);

    pool.query('select * from employee where id=?', [req.query.id], function (error, results, fields) {
        var x = JSON.stringify(results);
        if (x === '[]') {
            res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + '<h2>ERROR: No Such ID<h2>')
        }
        //res.end(JSON.stringify(results));
        res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + JSON.stringify(results));




    });
});




router.post('/',empauth, function (req, res) {
    var postData = req.body;
    pool.query('INSERT INTO employee SET id=?,`name`=?,`salary`=?,`age`=?', [req.body.id, req.body.name, req.body.salary, req.body.age], function (error, results, fields) {
        if (error) {
            res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + '<h2>ERROR: ID ALREADY EXISTS</h2>')
        }
        res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + 'Record ' + [req.body.id] + ' has been Inserted!');

    });
});




router.put('/',empauth,function (req, res) {
    pool.query('UPDATE `employee` SET `name`=?,`salary`=?,`age`=? where `id`=?', [req.body.name, req.body.salary, req.body.age, req.body.id], function (error, results, fields) {

        var x = JSON.stringify(results);

        if (x === '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}') {
            res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + 'Record ' + [req.body.id] + ' has been Updated!');
        }
        res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + '<h2>ERROR: No Such Row</h2>')

    });
});




router.delete('/',empauth, function (req, res) {
    console.log(req.body);
    pool.query('DELETE FROM employee WHERE id=?', [req.body.id], function (error, results, fields) {
        var x = JSON.stringify(results);
        if (x === '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}') {

            res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1><p>' + 'Record ' + [req.body.id] + ' has been deleted!');
        }
        res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1><p>' + 'ERROR: NO Such ID');

    });
});

/*
router.get("/:productId", (req, res, next) => {
    let pid = req.params.productId;

    db.query(Product.getProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.length > 0) {
                
                res.status(200).json({
                    message:"Product found.",
                    product: data
                });
            } else {
                res.status(200).json({
                    message:"Product Not found."
                });
            }
        } 
    });    
});

router.post("/delete", (req, res, next) => {

    var pid = req.body.productId;

    db.query(Product.deleteProductByIdSQL(pid), (err, data)=> {
        if(!err) {
            if(data && data.affectedRows > 0) {
                res.status(200).json({
                    message:`Product deleted with id = ${pid}.`,
                    affectedRows: data.affectedRows
                });
            } else {
                res.status(200).json({
                    message:"Product Not found."
                });
            }
        } 
    });   
});
*/

module.exports = router;