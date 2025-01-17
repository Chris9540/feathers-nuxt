'use strict';

const createService = require('feathers-sequelize');
const createUserModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {

  const Model = createUserModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};

