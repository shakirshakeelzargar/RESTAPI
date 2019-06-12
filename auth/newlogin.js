var pool = require("../database/mysql")
var express = require("express");
var session = require('express-session');
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var _ = require("lodash");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'shakirSecretKey';

const router = express.Router();


var users1=[]

pool.query("SELECT * FROM shakir_admin", function (err, result, fields) {
    if (err) throw err;
    users1.push(result)
 







router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get("/", function (req, res) {
    res.json({ message: "Express is up!" });
});
var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users1[_.findIndex(users1, { id: jwt_payload.id })];
    console.log(user)
    console.log(user1)

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

passport.use(strategy);

router.use(passport.initialize());
router.use(methodOverride('_method'));


var users=[]

pool.query("SELECT * FROM shakir_admin", function (err, result, fields) {
    
    users.push(result)

router.post('/auth', function(request, response) {


     if (request.body.email && request.body.password) {
    var email = request.body.email;
    var password = request.body.password;
     
}

    var user = users[_.findIndex(users, { email: email })];
    if (!user) {
        response.end( "<p><h2>no such user found<h2>" );
    }
	if (email && password) {

        

		pool.query('SELECT * FROM shakir_admin WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
                request.session.email = email;


    var payload = { id: user.id };

                var token = 'BEARER '+jwt.sign(payload, jwtOptions.secretOrKey);
                response.end( "<p><h2>Successfully Logged In, Kindly Copy your token</h2></p>" + '<p>' +  token + '<p><h2><a href="http://northside.in/restapi/">Click Here To access REST API</a></h2></p>');

			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});
},
router.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
}));

});


module.exports = {
    method: router,
    otherMethod: passport.authenticate('jwt', { session: false })
}