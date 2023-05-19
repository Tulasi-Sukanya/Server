const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const Razorpay=require('razorpay');
// const bodyparser=require('body-parser');
const cors=require('cors');
const connection=require('./database/mongoose');
const ProductsRoutes=require('./Routes/Products');

var instance = new Razorpay({
    key_id: 'rzp_test_10o2MtARWZ4VG1',
    key_secret: 'JpDWWZMdJ31DAHIAlEtik2du',
  });
app.use(express.json());
app.use(express.urlencoded({extended:true}));//is must while getting req from backend
app.use(cors());
app.use('/',ProductsRoutes);
//for razorpay (payment process)
app.get('/',(req,res)=>{
    res.sendFile('standard.html',{root:__dirname})
})
app.post('/cart/OrderId',(req,res)=>{
    var options = {
        amount: req.body.amount,
        currency: "INR",
        receipt: "rcp1"
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.send({orderId : order.id})
      });
})

app.post("/api/payment/verify",(req,res)=>{

    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
   
     var crypto = require("crypto");
     var expectedSignature = crypto.createHmac('sha256', '')
                                     .update(body.toString())
                                     .digest('hex');
                                     console.log("sig received " ,req.body.response.razorpay_signature);
                                     console.log("sig generated " ,expectedSignature);
     var response = {"signatureIsValid":"false"}
     if(expectedSignature === req.body.response.razorpay_signature)
      response={"signatureIsValid":"true"}
         res.send(response);
     });

app.listen(process.env.PORT,async()=>{
    console.log(`server started at port ${process.env.PORT}`)
    console.log("Connecting to database")
    await connection()
})



///FRONT_END PART
 var orderId;
    $(document).ready(function () {
        var settings = {
            "url": "/create/orderId",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "amount": `${cart.cartTotalAmount}`
            }),
        };
        document.getElementById('rzp-button1').onclick = function (e) {
            var options = {
                "key": "rzp_test_10o2MtARWZ4VG1", // Enter the Key ID generated from the Dashboard
                "amount": `${cart.cartTotalAmount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "Apple Products",
                "description": "Buy apple",
                "image": `${cart.url}`,
                "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response) {
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature)
                    var settings = {
                        "url": "/api/payment/verify",
                        "method": "POST",
                        "timeout": 0,
                        "headers": {
                            "Content-Type": "application/json"
                        },
                        "data": JSON.stringify({ response }),
                    }
                
                    //creates new orderId everytime
                    $.ajax(settings).done(function (response) {
                        alert(JSON.stringify(response))
                    })
                }
            }
                var rzp1 = new Razorpay(options);
                rzp1.on('payment.failed', function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                });
                rzp1.open();
                e.preventDefault();
            }
        });


//////////////////////////////////////////////        
// import React from 'react'
// import { useCart } from 'react-use-cart'
// import Layout from '../Components/Layout/Layout';
// import axios from 'axios';

// // const API = "http://localhost:8000";

// const CartPage = (props) => {
//   const {items,isEmpty,totalUniqueItems,totalItems,cartTotal,updateItemQuantity,removeItem,emptyCart} = useCart();
// //payment

// const initpayment=(data)=>{
//   const options = {
//     key: "rzp_test_BVxUHDr29hbUG2", 
//     amount: data.amount,
//     currency: data.currency,
//     name: "E-Store",
//     description: "Test Transaction",
//     image: "https://cdn4.vectorstock.com/i/1000x1000/96/88/e-letter-volume-blue-and-purple-color-logo-design-vector-9459688.jpg",
//     handler: async (response)=>{
//        try{
//         const verifyUrl = "http://localhost:8000/verify";
//         const {data}= await axios.post({verifyUrl,response});
//         console.log(data);
//        }
//        catch(error){
//         console.log(error);
//        }
//     },
//     prefill: {
//         name: "Sukanya",
//         email: "Sukanya271.tulasi@gmail.com",
//         contact: "987654321"
//     },
//     theme: {
//         color: "#3399cc"
//     }
// };
// const rzp1 = new window.Razorpay(options);
// rzp1.open();
// };

// const handlepayment = async()=>{
//   try{
//     const orderUrl = "http://localhost:8000/orders";
//     const {data} = await axios.post(orderUrl,{amount:cartTotal});
//     console.log(data);
//     initpayment(data.data);
//   }
//   catch(error){
//     console.log(error);
//   }
// };

//   return (
//     <Layout title={"E-shop Cart"}>
//     <div>
//         <section className='py-4 container'>
//           <div className='row justify-content-center'>
//             {isEmpty ? <h3 style={{textAlign:"center"}}>Your Cart is Empty!!!</h3> : ""}
//             <h5 style={{textAlign:"right"}}> TotalItems:({totalItems}) </h5>
//             <div className='col-12'>
//               <h5>Cart ({totalUniqueItems})</h5>
//               <table className='table table-light table-hover n-0'>
//                 <tbody>
//                   {items.map((item,index)=>{
//                     return(
//                       <tr key={index}>
//                       <td>
//                         <img src={item.image} style={{height:"6rem"}} alt="error" />
//                       </td>
//                       <td style={{textAlign:"center",padding:"4%"}}>{item.name}</td>
//                       <td style={{textAlign:"center",padding:"4%"}}>{item.price}</td>
//                       <td style={{textAlign:"center",padding:"4%"}}> 
//                         <button className='btn btn-info ms-2' onClick={()=>updateItemQuantity(item.id,item.quantity -1)}>-</button>&nbsp;
//                         <b>{item.quantity}</b>
//                         <button className='btn btn-info ms-2' onClick={()=>updateItemQuantity(item.id,item.quantity +1)}>+</button>&nbsp;
//                         <button className='btn btn-danger ms-2' onClick={()=>removeItem(item.id)}>Remove Item</button>
//                       </td>
//                     </tr>
//                     )
//                 })}
//                 </tbody>
//               </table>
//             </div>
//             <div className='col-auto ms-auto'>
//             {/* <h2>Total Price: {price} </h2> */}
//             <h2>Total Price: {cartTotal} </h2>
//               {/* <h2>Total Price: ${ items.map((item)=>item.quantity * item.price).reduce((sum,value)=>sum+value,0)}</h2> */}
//             </div>
//             <div className='col-auto'>
//               <button className='btn btn-danger m-2' onClick={()=>{emptyCart()}}>Clear Cart</button>
//               <button className='btn btn-primary m-2' onClick={()=>{handlepayment()}} >Checkout</button>
//             </div>
//           </div>
//         </section>
//     </div>
//     </Layout>
//   )
// }


// export default CartPage