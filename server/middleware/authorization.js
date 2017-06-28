const jwt = require('jsonwebtoken');

module.exports = {
  authorize(req, res, next) {
    jwt.verify(req.headers.authorization,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'wrong token' });
        }
        req.decoded = decoded;
        return next();
      });
  },
  authorizeAdmin(req, res, next) {
    if (req.decoded.role !== 1) {
      return res.status(401).json({ message: 'unathorized' });
    }
    req.isAdmin = true;
    return next();
  },
};
