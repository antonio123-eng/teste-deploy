const { DataTypes } = require("Sequelize")
const dbConnection = require("../db/connection")

const User = dbConnection.define("User", {

   name: {
      type: DataTypes.STRING,
      allowNull: false
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false
   }

})

module.exports = User
