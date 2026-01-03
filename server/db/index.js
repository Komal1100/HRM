import mongoose from "mongoose";


const connectionDB = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://komal_db_user:dsdfBnxN352A5zjE@cluster0.rcdlx9g.mongodb.net/HRM")
        console.log(`\n MongoDB connnect at HOST : ${
            connectionInstance.connection.host
        }`)
        // console.log(connectionInstance)
    } catch (error) {
        console.error("ERROR(MongoDB Connection Failed) : " , error)
        process.exit(1)
    }


}


export default connectionDB