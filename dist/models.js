'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('books_db', null, null, {
  host: 'localhost',

  dialect: 'sqlite',

  storage: './data.sqlite'
});