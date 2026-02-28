require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database")


connectToDb();


app.listen(8080,()=>{
    console.log("Server is listening to the port 8080");
    
})
