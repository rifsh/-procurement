const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  console.log('ssss');
  
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ status: 'fail', message: 'Token is missing' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ status: 'fail', message: 'Invalid token' });
    console.log(err);
    
    req.user = user;
    next();
  });
};

module.exports = authenticate;