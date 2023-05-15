const mongoose=require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id:Number,
    catagory:String,
    name:String,
    image:Array,
    ratting:String,
    price:Number,
    oprice:String,
    shipping:Boolean,
  },
  { timestamps: true }
);

const productmodel = mongoose.model("Productsinfo", productSchema);

module.exports={productmodel}