const express = require("express")
const Razorpay = require("razorpay")
const crypto = require("crypto");

const router = express.Router();

router.post("/orders",async(req,res)=>{
    try{
        const instance = new Razorpay({ key_id: 'rzp_test_BVxUHDr29hbUG2', key_secret: 'uXJaowDfYBMsMi9jxWrKPwxM' })
        
        const options = {
            amount: req.body.price * 100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        
        instance.orders.create(options, function(err, order) {
            if(err){
                console.log(err);
                return res.status(500).json({message:"Something went out wrong.."});
            }
            res.status(200).json({data:order});
            console.log(order);
        });
    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
});

router.post("/verify",async(req,res)=>{
    try{
        const { razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        const sign=razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', 'uXJaowDfYBMsMi9jxWrKPwxM')
            .update(body.toString())
            .digest('hex');
                                    
        if(expectedSignature === razorpay_signature){
            return res.status(200).json({message:"Payment Verified Successfully!!!"});
        }
        else{
            return res.status(400).json({message:"Invalid Signature.."});
        }

    }
    catch(error){
        res.status(500).json({message:"Internal Server Error"});
        console.log(error);
    }
})

// export const PaymentRoutes = router;