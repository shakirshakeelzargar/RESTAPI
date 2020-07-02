var express = require("express")
var pool = require("../database/mysql")
var empauth = require("../auth/empauth").otherMethod





const methodOverride = require('method-override');
var empquery = require("./empquery-controller")

const router = express.Router();
router.use(methodOverride('_method'));



router.get('/', empauth, function (req, res, ) {
    console.log(req.query);

    empquery.getEmployee([req.query.id], function (error, results, fields) {
        var x = JSON.stringify(results);
        if (x === '[]') {
            res.end('<h2>ERROR: No Such ID<h2>')
        }
        //res.end(JSON.stringify(results));
        res.end( JSON.stringify(results));




    });
});




router.post('/', empauth, function (req, res) {
    var postData = req.body;
    empquery.addEmployee([req.body.id, req.body.name, req.body.salary, req.body.age], function (error, results, fields) {
        if (error) {
            console.log("Error in post is: ",error)
            res.end( 'ERROR: ID ALREADY EXISTS')
        }
        res.end( 'Record ' + [req.body.id] + ' has been Inserted!');

    });
});




router.put('/', empauth, function (req, res) {
    empquery.updateEmployee([req.body.name, req.body.salary, req.body.age, req.body.id], function (error, results, fields) {

        var x = JSON.stringify(results);

        if (x === '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}') {
            res.end( 'Record ' + [req.body.id] + ' has been Updated!');
        }
        res.end('<h2>ERROR: No Such ID</h2>')

    });
});




router.delete('/', empauth, function (req, res) {
    console.log(req.body);
    empquery.deleteEmployee([req.body.id], function (error, results, fields) {
        var x = JSON.stringify(results);
        if (x === '{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}') {

            res.end( 'Record ' + [req.body.id] + ' has been deleted!');
        }
        res.end( 'ERROR: NO Such ID');

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