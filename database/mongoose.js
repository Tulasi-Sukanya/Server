const mongoose =require("mongoose");

const connectTodb = async()=>{
    try{
        const dbconnection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb Database ${dbconnection.connection.host}`);
    }
    catch(error){
        console.log(`Error in Mongo db ${error}`);
    }
};

module.exports= connectTodb;