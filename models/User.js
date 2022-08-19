import { DataTypes } from "Sequelize"
import dbConnection from "../db/connection"

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

export default User
