require('dotenv').config();
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Invalid or missing bearer token.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message:'Not token provided'});
    }

    //return res.json(process.env.SECRET_KEY)

    jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
        // return res.json(process.env.SECRET_KEY)
        if (error) {
            return res.status(403).json({message: 'Token verification failed'});
        }

        req.userId = decode.userId;
        next();
    })
    

};

module.exports = authMiddleware;