const mongoose = require('mongoose')

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS


const connection = async() => {

   try {
      const dbConnection = await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.bjgt3wm.mongodb.net/?retryWrites=true&w=majority`)

      console.log("Conectou ao banco!")

      return dbConnection
   } catch (error) {
      console.log(error)
   }

}

connection()
module.exports = connection