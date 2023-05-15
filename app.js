const dotenv=require("dotenv").config();
const express=require("express");
const connection = require("./database/mongoose")
const userroute = require("./Routers/user")
const productroute=require("./Routers/product")
// const PaymentRoute = require("./Routers/Payment")
const cors=require("cors");
// const PORT=process.env.PORT || 6000;
const PORT=8000;
const app =express();

app.use(express.json());
// app.use(express.urlencoded)
app.use(express.urlencoded({extended:true}));
//middlewares
app.use(cors());

//api
app.get("/",(req,res)=>{
    res.send({message:"Welcome to Ecommerce Application.."});
});
//routes
app.use(userroute);
app.use(productroute);
// app.use(PaymentRoute);

app.listen(PORT,async ()=>{
    console.log(`Server is running on ${PORT}`)
    await connection();
});