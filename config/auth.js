const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = function(req, res, next) {
    //Checking for token
    let token = req.get('Authorization') || req.query.token || req.body.token;
    if(token){
        // Remove the 'Bearer' if it was included in the token header
        token = token.replace('Bearer ', '')
        //Check if token valid and not expired
        jwt.verify(token, SECRET, function(err,decoded) {
            if(err){
                next(err);
            }else{
                req.user = decoded.user;
                next();
            }
        });
    }else {
        next();
    }   
}