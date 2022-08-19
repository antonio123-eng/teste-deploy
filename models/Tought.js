const { DataTypes } = require("sequelize")
const dbConnection = require("../db/connection")

const Tought = dbConnection.define("Tought", {
   title: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
   }
})

module.exports = Tought