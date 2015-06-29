var should = require('should'),
  assert = require('assert'),
  app = require('../server.js'),
  request = require('supertest'),
  mongoose = require('mongoose'),
  db = require('../config/database'),
  bcrypt = require('bcrypt-nodejs'),
  User = require('../app/models/user.js'),
  Book = require('../app/models/book.js'),
  factory = require('./factory'),

  url = "localhost:8080",
  password = 'lolpan',
  agent,
  loginAgent,
  initAgent,
  stringContains,
  emptyDatabase,
  isError;

emptyDatabase = function (done) {
  User.remove({
    email: {
      $nin: ["agent@test.com", "sebastian.vasser@gmail.com", "guest@email.com"]
    }
  }, function (err) {
    should.not.exist(err);
    Book.remove({}, function (err) {
      should.not.exist(err);
      done();
    });
  });
};

before(function (done) {
  emptyDatabase(done);
});

afterEach(function (done) {
  emptyDatabase(done);
});