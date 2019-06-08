var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));



//start mysql connection
var connection = mysql.createConnection({
    host     : 'northside.in',
    user     : 'shakir',
    password : 'shakir123',
    database : 'shakir_test'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
//end mysql connection

//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration

//create app server
var server = app.listen(3000)

/*
//rest api to get all results
app.get('/employee', function (req, res) {
   connection.query('select * from employee', function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});
*/
//rest api to get a single employee data
app.get('/employee', function (req, res,) {
    console.log(req.query);

    connection.query('select * from employee where id=?', [req.query.id], function (error, results, fields) {
      var  x= JSON.stringify(results);
      if (x==='[]') {
        res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' + '<h2>ERROR: No Such ID<h2>')
      }
       //res.end(JSON.stringify(results));
       res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' +  JSON.stringify(results));

  
   

     });
 });
 

//rest api to create a new record into mysql database
app.post('/employee', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO employee SET id=?,`name`=?,`salary`=?,`age`=?', [ req.body.id,req.body.name,req.body.salary, req.body.age], function (error, results, fields) {
	  if (error) {
      res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>'+'<h2>ERROR: ID ALREADY EXISTS</h2>')
    }
    res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' +  'Record ' + [req.body.id] +' has been Inserted!');
  
  });
});

//rest api to update record into mysql database
app.put('/employee', function (req, res) {
   connection.query('UPDATE `employee` SET `name`=?,`salary`=?,`age`=? where `id`=?', [req.body.name,req.body.salary, req.body.age, req.body.id], function (error, results, fields) {
 
    var  x= JSON.stringify(results);
   
    if (x==='{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"(Rows matched: 1  Changed: 1  Warnings: 0","protocol41":true,"changedRows":1}')
    {
    res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' +  'Record ' + [req.body.id] +' has been Updated!');
    }
    res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1>' +'<h2>ERROR: No Such Row</h2>')

  });
});

//rest api to delete record from mysql database
app.delete('/employee', function (req, res) {
   console.log(req.body);
   connection.query('DELETE FROM `employee` WHERE `id`=?', [req.body.id], function (error, results, fields) {
    var  x= JSON.stringify(results);
    if (x==='{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}')
  {
   
   res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1><p>'  + 'Record ' + [req.body.id] +' has been deleted!');
  }
   res.end('<h1><a href="http://northside.in/restapi/">Click Here To Go Back</a></h1><p>'  + 'ERROR: NO Such ID');

  });
});