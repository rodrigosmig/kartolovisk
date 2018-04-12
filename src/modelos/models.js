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

export let Round = sequelize.define('round', {
	round: Sequelize.INTEGER
})

export let Formation = sequelize.define('formation',{
	formation: Sequelize.STRING
})

//chave entrangeira de Event
Tipo.hasOne(Event)
Player.hasOne(Event)
Event.belongsTo(Round)
Player.belongsToMany(Event, {through: 'Details'})
Event.belongsToMany(Player, {through: 'Details'})

//chave estrangeira de Team
Team.belongsTo(User)
Player.belongsToMany(Team, {through: 'PlayerTeam'})
Team.belongsToMany(Player, {through: 'PlayerTeam'})

//chave estrangeira de Team
Team.belongsTo(User)


//chave estrangeira de League
League.belongsToMany(Team, {through: 'TeamLeague'})
Team.belongsToMany(League, {through: 'TeamLeague'})
League.belongsTo(User)




sequelize.sync()