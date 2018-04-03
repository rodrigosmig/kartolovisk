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

export let Player= sequelize.define('player',{
	
	country: Sequelize.STRING,
	position: Sequelize.STRING,
	picture: Sequelize.IMAGE, //foto do jogador 
	score: Sequelize.INTEGER //pontuação

})
  
export let Event = sequelize.define('event',{
	id_player: Event.hasOne(Player,{ foreignKey: ''}),
	round: Sequelize.STRING,
	type: Sequelize.STRING
})

User.sync();



