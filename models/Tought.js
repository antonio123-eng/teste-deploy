import { DataTypes } from "sequelize"
import dbConnection from "../db/connection"
import User, { hasMany } from "./User"

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
})
hasMany(Tought, {
   foreignKey: "userId"
})

export default Tought