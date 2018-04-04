'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Tipo = exports.Event = exports.Player = exports.User = undefined;

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sequelize = new _sequelize2.default('users_db', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './data.sqlite'
});

var User = exports.User = sequelize.define('user', {
	nickname: _sequelize2.default.STRING,
	password: _sequelize2.default.STRING,
	email: _sequelize2.default.STRING

});

var Player = exports.Player = sequelize.define('player', {

	name: _sequelize2.default.STRING,
	country: _sequelize2.default.STRING,
	position: _sequelize2.default.STRING,
	//picture: Sequelize.IMAGE,
	score: _sequelize2.default.INTEGER

});

var Event = exports.Event = sequelize.define('event', {

	round: _sequelize2.default.STRING,
	type: _sequelize2.default.STRING
});

var Tipo = exports.Tipo = sequelize.define('tipo', {

	name: _sequelize2.default.STRING,
	score: _sequelize2.default.INTEGER
});

Event.belongsTo(Tipo);
Tipo.hasMany(Event);

Player.belongsTo(Event);
Event.hasMany(Player);

User.sync();
Player.sync();
Event.sync();
Tipo.sync();