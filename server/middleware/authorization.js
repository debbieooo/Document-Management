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
        next();
      });
  },

  searchDocScope(req, res, next) {
    const query = req.params.q;
    let searchQuery = {
      where: { title: { $iLike: `%${query}%` } }
    };

    if (req.decoded.roleId !== 1) {
      searchQuery = {
        where: {
          $and: [
            { title: { $iLike: `%${query}%` } },
            { userId: req.decoded.id }
          ]
        }
      };
    }

    req.searchQuery = searchQuery;

    next();
  }

};
