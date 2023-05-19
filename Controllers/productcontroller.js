const {productmodel} = require("../models/productmodel")

const ProductsEnrollment= async(req,res)=>{
    const ProductData=req.body;
    try{
        const productDocument = new productmodel({
            id:ProductData.id,
            catagory:ProductData.catagory,
            name:ProductData.name,
            ratting:ProductData.ratting,
            image:ProductData.image,
            price:ProductData.price,
            oprice:ProductData.oPrice,
            // quantity:ProductData.quantity,
            shipping:ProductData.shipping
        });
        //save data in collection..
        const dbresponse = await productDocument.save();
        // const dbresponse = await Productsinfo.insertMany(productDocument).save();
        console.log("Data is Saved =>",dbresponse);
        return res.status(200).send({message:"Product info is Saved"})

    }
    catch(error){
        console.log(error);
        return res.status(500).send({success: false,message: "Error in creating product",error});
    }
}

const getAllproducts = async(req,res) =>{
    try{
        const result = await productmodel.find({});
        console.log({message:"Reteriving all products from database"},result);
        return res.status(200).send({success:true,message:"All Products fetched successfully..",data:result});
    }
    catch(error){
        console.log("Error occured while retriving data from database..");
        return res.status(500).send({message:"Internal Server Error"});
    }
}

// const getProductDetails = async(req,res)=>{
//     const productId = req.params.id;
//     console.log("Product Id=> ",productId);
//     try{
//         // const result = await productmodel.findOne({_id:objectId(productId.toString())});
//         const product = await productmodel.findOne({_id:objectId(productId.toString())}).select("-image").populate("catagory");
//         return res.status(200).send({success:true,message:"Product details fetched.."},product);
//     }
//     catch(error){
//         console.log("Error Occurred while fetching data",error);
//         return res.status(500).send({message:"internal Server Error"},error);  
//     }
// }

module.exports={ProductsEnrollment,getAllproducts}