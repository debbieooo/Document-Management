const jwt = require('jsonwebtoken');

module.exports = {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   */
  authorize(req, res, next) {
    jwt.verify(req.headers.authorization,
      process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          res.status(401).json({ message: 'wrong token' });
        } else {
          req.decoded = decoded;
          return next();
        }
      });
  },
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @param {any} next
   * @returns
   */
  authorizeAdmin(req, res, next) {
    if (req.decoded.role !== 1) {
      return res.status(401).json({ message: 'unathorized' });
    } else {
      req.isAdmin = true;
      return next();
    }
  }
};
