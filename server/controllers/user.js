const Users = require('../models').User;
// const Roles = require('../models').Role;
const Docs = require('../models').Doc;
const jwt = require('jsonwebtoken');

module.exports = {
  create(req, res) {
    Users.findAndCountAll({ where: {
      $or: [
        {
          userName: req.body.userName,
        },
        {
          email: req.body.email
        }
      ]
    }
    })
      .then((result) => {
        if (result.count > 0) {
          console.log('USERS.COUNT', result.count);
          res.status(409)
            .send({ message: 'Username already exists in the database' });
        } else {
          console.log(req.body);
          Users
      .create({
        userName: req.body.userName,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        roleId: req.body.roleId ? req.body.roleId : 3
      })
      .then((user) => {
        // console.log(process.env.SECRET_KEY, '\n hey I\'m secret');
        const token = jwt.sign({
          data: user.id,
          expiresIn: '3h'
        }, process.env.SECRET_KEY);

        return res.status(201).send({ token, user });
      })
      .catch(error => res.status(400).send(error));
        }
      });
  },

  login(req, res) {
    if (
      req.body.email === '' || req.body.password === ''
      || req.body.userName === ''
      ) {
      return res.status(400).json({
        message: 'Pls put in your values'
      });
    }
    Users
      .findOne({
        where: {
          $or: [{
            userName: req.body.userName
          }, {
            email: req.body.email
          }]
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'Wrong username/email'
          });
        } else if (user.validate(req.body.password)) {
          const info = {
            id: user.id,
            roleId: user.roleId,
            userName: user.userName,
            name: user.name,
            email: user.email
          };
          const token = jwt.sign({
            data: user.id,
            expiresIn: '3h'
          }, process.env.SECRET_KEY);
          res.status(200).send({
            status: 200,
            info,
            message: 'You are now logged in',
            token
          });
        } else {
          res.status(400).json({
            status: 400,
            message: 'Wrong details'
          });
        }
      })
     .catch(error => res.status(400).send({ message: 'Bad request' }));
  },
  listAll(req, res) {
    return Users
     .findAll({
     })
     .then(users => res.status(200).send(users))
     .catch(error => res.status(400).send(error));
  },
  findUser(req, res) {
    return Users
     .findById(req.params.id)
     .then((user) => {
       if (!user) {
         return res.status(400).send({
           message: 'User Not Found'
         });
       }

       res.status(200)
           .send({ user });
     })
     .catch(error => res.status(400).send({
       message: 'Bad request'
     }));
  },
  update(req, res) {
    return Users
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'Not Found',
        });
      }
      return user
      .update(req.body)
      .then(() => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  findUserDoc(req, res) {
    console.log('reqsssss', req.params);
    return Docs
     .findAll({ where: {
       userId: req.params.id
     }
     })
     .then((user) => {
       if (!user) {
         return res.status(400).send({
           message: 'No Document Found for this user'
         });
       }

       res.status(200)
           .send({ user });
     })
     .catch(error => res.status(400).send({
       message: 'Bad request'
     }));
  },
  delete(req, res) {
    return Users
     .findById(req.params.id)
     .then((user) => {
       if (!user) {
         return res.status(400).send({
           message: 'User Not Found'
         });
       }
       return user
       .destroy()
       .then(() => res.status(200).send({
         message: 'User deleted successfully'
       }))
       .catch(error => res.status(400).send(error));
     })
     .catch(error => res.status(400).send({
       message: 'Bad request'
     }));
  }
};
