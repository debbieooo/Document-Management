const Users = require('../models').User;
const Documents = require('../models').Documents;

module.exports = {
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  searchUser(req, res) {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 4;
    const query = req.query.name;
    Users.findAndCountAll({
      order: '"createdAt" DESC',
      where :{
        $or: [{
          userName: { $iLike: `%${req.query.q}%` }
        }, {
          name: { $iLike: `%${req.query.q}%` }
        }]
      },
      limit,
      offset
    })
      .then((user) => {
        res.status(200)
          .send({
            user: user.rows,
            metadata: {
              count: user.count,
              searchTerm: query,
              pageCount: Math.ceil(user.count / limit),
              page: Math.floor((limit + offset) / limit),
              pageSize: limit
            }
          });
      })
      .catch(() => {
        res.status(404)
          .send({ message: `${query}cannot be found on the database` });
      });
  },
  /**
   *
   *
   * @param {any} req
   * @param {any} res
   */
  searchDocs(req, res) {
    const role = req.decoded.role;
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 4;
    const query = req.query.title;
    let where = {};
    if (role !== 1) {
      where = { title: { $iLike: `%${query}%` } };
    } else {
      where = { title: { $iLike: `%${query}%` }, access: 'Public' };
    }
    Documents.findAndCountAll({
      order: '"createdAt" DESC',
      offset,
      limit,
      where,
      include: {
        model: Users,
        attributes: ['name']
      }
    })
      .then((result) => {
        res.status(200)
          .send({
            result,
            metadata: {
              count: result.count,
              searchTerm: query,
              pageCount: Math.floor(result.count / limit),
              pageSize: limit

            }
          });
      })
      .catch(() => {
        res.status(404)
          .send({ message: `${query} cannot be found on the database` });
      });
  }

};
