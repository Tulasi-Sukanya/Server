const {usermodel} = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const {auth} = require("../Middlewares/auth")

const signInController =async(req,res)=>{
    console.log(req.body)
    const {name,email,password,phone,address,question}=req.body;
     //validation
     if(!name){
        return res.send({message:"Name is required"})
    }
    if(!email){
        return res.send({message:"Email is required"})
    }
    if(!password){
        return res.send({message:"password is required"})
    }
    if(!phone){
        return res.send({message:"Mobile number is required"})
    }
    if(!address){
        return res.send({message:"Address is required"})
    }
    if(!question){
        return res.send({message:"Answer is required for given question"})
    }

    //checking user exists or not..
    const isUserExist=await usermodel.findOne({email})

    if(isUserExist){
        res.status(400).send({msg:"user Already Exists.."});
        return;
    }
    if((!/^(?=.*[0-9])(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[@!#%&]).{6,}$/g.test(password))){
        res.status(400).send({msg:"Password pattern does not exists.."})
        return;
    }
    const salt=await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt);
    const newuser=new usermodel({
        name:name,
        email:email,
        password:hashedpassword,
        phone:phone,
        address:address,
        question:question
    }).save();
    console.log(newuser);
    // const result = await client.db("MERN Ecommerce").collection("users").insertOne(newuser);
    res.send({msg:"User Registered successfully"});
}

const loginController = async(req,res) =>{
    const {email,password}=req.body;

    const isUserExist=await usermodel.findOne({email});
    console.log(isUserExist);
    if(!isUserExist){
        res.status(400).send({msg:"Invalid credentials"});
        return;
    }
    const passwordMatch=await bcrypt.compare(password,isUserExist.password)
    // const token=jwt.sign({id:isUserExist._id},process.env.JWT_SECRET)
    // return res.status(200).send({msg:"Login Successfull"},token);

    console.log(passwordMatch);
    if(!passwordMatch){
        res.status(400).send({msg:"Invalid credentials.."});
        return;
    }

    const token=jwt.sign({id:isUserExist._id},process.env.JWT_SECRET);
    console.log(token);
    return res.status(200).send({msg:"Login Successfull"},token,auth);
}

//forgotpasswordcontroller
const forgotpasswordController= async(req,res)=>{
    try{
    const { email, question, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!question) {
      res.status(400).send({ message: "Answer is required for given question" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const isUserExist = await usermodel.findOne({ email, question });
    //validation
    if (!isUserExist) {
      return res.status(404).send({message: "Wrong Email Or question"});
    }
    const hashed = await hashpswd(newPassword);
    await usermodel.findByIdAndUpdate(isUserExist._id, { password: hashed });
    res.status(200).send({success: true,message: "Password Reset Successfully"});
    }
    catch(error){
        console.log("Something went wrong while registering user..");
        return res.status(500).send({message:`something went wrong while registering user.. ${error}`,success:false})
    }
}

module.exports={signInController,loginController,forgotpasswordController}