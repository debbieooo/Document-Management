const Users = require('../models').User;
const Docs = require('../models').Doc;

module.exports = {
  searchUser(req, res) {
    if (
      req.query.userName === '' || req.query.email === ''
    ) {
      return res.status(400).json({
        message: 'Pls put in a query'
      });
    }
    Users
      .findAll({
        where: {
          $or: [{
            userName: req.query.userName
          }, {
            email: req.query.email
          }]
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Wrong username/email'
          });
        }
        const users = user.filter(user => user.id !== req.user.id);
        res.status(200)
           .send({ users });
      })
      .catch(error => res.status(400).send({
        message: 'Bad request'
      }));
  },
};
