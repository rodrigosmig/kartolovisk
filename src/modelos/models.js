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

export let League = sequelize.define('league', {
	name: Sequelize.STRING
})

//chave entrangeira de Event
Tipo.hasOne(Event)
Player.hasOne(Event)

//chave estrangeira de Team
Team.belongsTo(User)
Player.belongsToMany(Team, {through: 'PlayerTeam'})
Team.belongsToMany(Player, {through: 'PlayerTeam'})

//chave estrangeira de League
League.belongsToMany(User, {through: 'UserLeague'})
User.belongsToMany(League, {through: 'UserLeague'})
League.belongsTo(User)


sequelize.sync()