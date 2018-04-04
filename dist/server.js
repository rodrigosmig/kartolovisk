'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./rotas/user');

var _user2 = _interopRequireDefault(_user);

var _player = require('./rotas/player');

var _player2 = _interopRequireDefault(_player);

var _team = require('./rotas/team');

var _team2 = _interopRequireDefault(_team);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());
app.use('/', _user2.default);
app.use('/', _player2.default);
app.use('/', _team2.default);

app.listen(3000, function () {
	console.log('App na porta 3000!');
});