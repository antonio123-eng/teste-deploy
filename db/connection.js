const { Sequelize } = require("sequelize")

const database = process.env.DATABASE
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST

const databaseUrl = new Sequelize(`${database}`, `${dbUser}`, `${dbPassword}`, {
   host: `${dbHost}`,
   dialect: "mysql"
})


module.exports = databaseUrl