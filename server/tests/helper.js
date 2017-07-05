import chai from 'chai';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import db from '../models/index';
import httpMocks from 'node-mocks-http';
const faker = require('faker');
import events from 'events';
require('dotenv').config();
const request = require('supertest');

global.chai = chai;
global.request = request;
global.expect = chai.expect;
global.User = db.User;
global.sinon = sinon;
global.Documents = db.Documents;
global.Role = db.Role;
global.httpMocks = httpMocks;
global.faker = faker;
global.generateToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    role: user.roleId,
    expiresIn: '1h'
  }, process.env.SECRET_KEY);
  return token;
}
global.sequelize = db.sequelize;
global.generateRoleAdmin = () => {
  return {
    title: 'Admin'
  }
};
global.generateRoleGeneral = () => {
  return {
    title: 'General'
  }
};
global.generateRoleStaff = () => {
  return {
    title: 'Staff'
  }
};
global.generateRegUser = () => {
  return {
    name: faker.name.firstName(),
    userName: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: '2'
  }
};
global.generateAdminUser = () => {
  return {
    name: faker.name.firstName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: 1
  }
};
global.generateStaffUser = () => {
  return {
    name: faker.name.firstName(),
  userName: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  roleId: '3'
  }
};
global.generateDocument = (userId) => {
  return {
    content: faker.lorem.paragraphs(),
    title: faker.lorem.words(),
    userId,
    access: 'Public'
  }
};
global.generateAdminRole = () => {
  return {
    title: 'Admin'
  }
};
global.generateRegularRole = () => {
  return {
    title: 'Regular'
  }
};
global.generateStaffRole = () => {
  return {
    title: 'Staff'
  }
};
global.events = events;