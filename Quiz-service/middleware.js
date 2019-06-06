const jwt = require('jsonwebtoken');
const config = require('./config');



module.exports = {
    getUserRole : function getUserRole(token) {
        return(jwt.verify(token,config.secret , function (err, decodedToken) {
            if(err) {
                console.log("invalid token");
                return 0 ;
            }
            console.log('token verified user is ' + decodedToken.role);
            return decodedToken.role ;
        }))
     },
    
     getUserName : function getUserName(token) {
        return(jwt.verify(token,config.secret,function(err,decodedToken){
            if(err) {
                console.log("invalid token");
                return 0 ;
            }
            console.log('token verified user is ' + decodedToken.user);
            return decodedToken.user ;
        }))
    }
 } ;
 