const Users = require('../models').User;
const Docs = require('../models').Doc;

module.exports = {
  searchUser(req, res) {
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 4;
    const query = req.query.name;
    Users.findAndCountAll({
      order: '"createdAt" DESC',
      where: { name: { $iLike: `%${query}%` } },
      limit,
      offset
    })
      .then((result) => {
        res.status(200)
          .send({
            result: result.rows,
            metadata: {
              count: result.count,
              searchTerm: query,
              pageCount: Math.ceil(result.count / limit),
              page: Math.floor((limit + offset) / limit)
            }
          });
      })
      .catch(() => {
        res.status(404)
          .send({ message: `${query}cannot be found on the database` });
      });
  },
  searchDocs(req, res) {
    // const userId = req.decoded.id;
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
    Docs.findAndCountAll({
      order: '"createdAt" DESC',
      offset,
      limit,
      where
    })
      .then((result) => {
        console.log('result.rows.userId', result.userId);
        // if (userId === result.userId && result.access !== 'Public' && role !== 1) {
        //   res.status(401).send('');
        // }
        // console.log('resultsssss', result.rows);
        res.status(200)
          .send({
            result,
            metadata: {
              count: result.count,
              searchTerm: query,
              pageCount: Math.floor(result.count / limit)

            }
          });
      })
      .catch(() => {
        res.status(404)
          .send({ message: `${query} cannot be found on the database` });
      });
  }

};
