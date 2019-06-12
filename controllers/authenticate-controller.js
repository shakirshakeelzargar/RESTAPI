
var pool = require("../database/mysql");
var auth=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    connection.pool('SELECT * FROM shakir_admin WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){
                res.json({
                    status:true,
                    message:'successfully authenticated'
                })
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}
app.post('/login',authenticateController.auth);

module.exports = {
    method: app,
    otherMethod: passport.authenticate('jwt', { session: false }),
    authh: auth
}