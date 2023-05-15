const express=require("express");
const { signInController, loginController, forgotpasswordController } = require("../Controllers/usercontroller");
const { auth } = require("../Middlewares/auth");
const router=express.Router();

router.post("/register",signInController);
router.post("/login",loginController);
router.post("/forgot-password",forgotpasswordController);

module.exports=router