require('dotenv').config();
const jwt = require('jsonwebtoken');


const authMiddleware = (req, res, next) => {
  // const token = req.cookies.token;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or invalid' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token not found in the Authorization header' });
  }


  // return res.json(authHeader)
  jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
    if (error) {
      return res.status(403).json({ message: 'Token verification failed' });
    }

    req.userId = decode.userId;
    next();
  })


};

module.exports = authMiddleware;