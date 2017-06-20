const Users = require('../models').User;
const Docs = require('../models').Doc;

module.exports = {
  searchUser(req, res) {
    const query = req.query.q;
    Users.findAndCountAll({
      order: '"createdAt" DESC',
      where: { name: { $iLike: `%${query}%` } }
    })
      .then((result) => {
        res.status(200)
          .send({
            result: result.rows,
            metadata: {
              count: result.count,
              searchTerm: query
            }
          });
      })
      .catch(() => {
        res.status(404)
          .send({ message: `${query}cannot be found on the database` });
      });
  },
  searchDocs(req, res) {
    const query = req.query.q;
    Docs.findAndCountAll({
      order: '"createdAt" DESC',
      where: { title: { $iLike: `%${query}%` } }
    })
      .then((result) => {
        res.status(200)
          .send({
            result: result.rows,
            metadata: {
              count: result.count,
              searchTerm: query
            }
          });
      })
      .catch(() => {
        res.status(404)
          .send({ message: `${query} cannot be found on the database` });
      });
  }

};
