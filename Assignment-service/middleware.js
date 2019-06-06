const jwt = require('jsonwebtoken');
const config = require(config);

function getTokenRole(token) {
    jwt.verify(token,config.secret , function (err, decodedToken) {
        if(err) {
            console.log("invalid token");
            return 0 ;
        }

        return decodedToken.role ;
    });
 }


module.exports = getTokenRole ;