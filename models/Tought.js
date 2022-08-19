const { DataTypes } = require("sequelize")
const dbConnection = require("../db/connection")
const User = require("./User")

const Tought = dbConnection.define("Tought", {
   title: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true
   }
})

Tought.belongsTo(User, {
   constraints: true,
   foreignKey: "userId"
}),

User.hasMany(Tought, {
   foreignKey: "userId"
}),

module.exports = Tought