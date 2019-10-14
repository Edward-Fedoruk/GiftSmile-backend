const Sequelize = require('sequelize')

const {
	DB_USER,
	DB_HOST,
	DB_DATABASE,
	DB_PASSWORD,
} = process.env

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'postgres',
})

module.export = sequelize
