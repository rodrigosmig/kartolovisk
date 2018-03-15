import Sequelize from 'sequelize'
let sequelize = new Sequelize('books_db'
, null, null, {
host: 'localhost'
,
dialect: 'sqlite'
,
storage: './data.sqlite'
});


