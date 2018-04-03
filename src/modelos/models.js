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

User.sync();



