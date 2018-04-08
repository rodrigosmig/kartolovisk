import Sequelize from 'sequelize';


let sequelize = new Sequelize('users_db', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	storage: './data.sqlite'
})

export let User = sequelize.define('user', {
	nickname: Sequelize.STRING,
	password: Sequelize.STRING,
	email: Sequelize.STRING
	
})

export let Player= sequelize.define('player', {
	name: Sequelize.STRING,
	country: Sequelize.STRING,
	position: Sequelize.STRING,
	score: Sequelize.INTEGER,
	imagePlayer: Sequelize.STRING
})
  
export let Event = sequelize.define('event', {
	round: Sequelize.STRING,
	
})

export let Tipo = sequelize.define('tipo', {
	name: Sequelize.STRING,
	score: Sequelize.INTEGER,
})

export let Team = sequelize.define('team', {
	name: Sequelize.STRING,
	formation: Sequelize.STRING
})

Tipo.hasOne(Event)
Player.hasOne(Event)
/* Event.belongsTo(Tipo)
Tipo.hasMany(Event)

Player.belongsTo(Event)
Event.hasMany(Player) */

/* User.belongsTo(Team)
Team.belongsTo(User) */

// User.hasMany(UserLeagueAssociation)
// UserLeagueAssociation.belongsTo(User)

// League.hasMany(UserLeagueAssociation)

User.sync();
Player.sync();
Event.sync();
Tipo.sync();
Team.sync();
// UserLeagueAssociation.sync();
// League.sync();


