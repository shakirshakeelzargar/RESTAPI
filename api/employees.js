var express = require("express")
var pool = require("../database/mysql")
var employee = require("../query/employee")

const router = express.Router();

router.get('/', function (req, res, ) {
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


router.post("/add", (req, res, next) => {

    //read product information from request
    let product = new Product(req.body.prd_name, req.body.prd_price);

    db.query(product.getAddProductSQL(), (err, data)=> {
        res.status(200).json({
            message:"Product added.",
            productId: data.insertId
        });
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