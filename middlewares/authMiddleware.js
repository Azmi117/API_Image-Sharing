const jwt = require('jsonwebtoken');

const authenticate = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({error: 'No Token Provided'});

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            return res.status(403).json({error: 'Failed Authenticate Token'});
        }
        req.user = decode;
        next();
    });
}

module.exports = authenticate;