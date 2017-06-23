import { Logger } from 'logger';
import bcrypt from 'bcrypt-nodejs';
import faker from 'faker';
import { sequelize, Roles, Users, Documents } from '../../models';
/**
 * Seeder - Class to populate database with values for testing purpose
 */
class Seeder {

  /**
   * Seeding database with test values
   * @return {void}
   */
  static seed() {
    sequelize.sync({ force: true })
    .then(() => {
      Seeder.seedRoles()
      .then(() => {
        Seeder.seedUsers()
         .then(() => {
           Seeder.seedDocuments();
         });
      });
    })
    .catch((err) => {
      Logger.error(err);
    });
  }

  /**
   * seedRoles - Seed the roles table with some data for testing purpose
   * @return {Object} An instance of sequelize
   */
  static seedRoles() {
    const roles = [
      {
        title: 'Admin'
      },
      {
        title: 'General'
      }
    ];
    return Roles.bulkCreate(roles);
  }

  /**
   * Seed database with some default users
   * @returns {object} - A Promise object
   */
  static seedUsers() {
    const users = [
      {
        username: 'deborah',
        email: 'deborah@admin.com',
        password: bcrypt.hashSync('admin', bcrypt.genSaltSync(5)),
        name: 'Deborah Oni',
        RoleId: 1
      },
      {
        username: 'mary',
        email: 'mary@maill.com',
        password: bcrypt.hashSync('mary', bcrypt.genSaltSync(5)),
        fullNames: 'Mary Lamb',
        RoleId: 2
      }
    ];
    return Users.bulkCreate(users);
  }

  /**
   * Add some documents to database
   * @returns {object} - A Promise object
   */
  static seedDocuments() {
    const documents = [
      {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        access: 'public',
        userId: '1'
      },
      {
        title: faker.lorem.words(),
        content: faker.lorem.paragraph(),
        access: 'public',
        userId: '1'
      },
      {
        title: faker.lorem.words(),
        content: faker.lorem.words(),
        access: 'public',
        userId: '2'
      }
    ];
    return Documents.bulkCreate(documents);
  }


}

export default Seeder.seed();
