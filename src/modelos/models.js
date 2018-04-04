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
	//picture: Sequelize.IMAGE,
	score: Sequelize.INTEGER

})
  
export let Event = sequelize.define('event', {
	round: Sequelize.STRING,
	type: Sequelize.STRING
})

export let Tipo = sequelize.define('tipo', {
	name: Sequelize.STRING,
	score: Sequelize.INTEGER
})

export let Team = sequelize.define('team', {
	name: Sequelize.STRING,
	formation: Sequelize.STRING
	
})

Event.belongsTo(Tipo)
Tipo.hasMany(Event)

Player.belongsTo(Event)
Event.hasMany(Player)

User.sync();
Player.sync();
Event.sync();
Tipo.sync();
Team.sync();


