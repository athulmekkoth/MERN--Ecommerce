import { instance } from "../index.js"
import dotenv from "dotenv"
import crypto from "crypto"
import exp from "constants";
import  Payment  from "../databases/Paymnet.js";
import Cart from "../databases/Cart.js";
import Order from "../databases/Order.js";

export const checkout=async(req,res,next)=>{ 

try{
const options = {
  amount: req.body.amount,  // amount in the smallest currency unit
  currency: "INR",

};

const order=await instance.orders.create(options)

res.status(200).json({succes:true,order})
}
catch(err)
{
  console.log(err)
}
}





export const paymentverification=async(req,res,next)=>{
 
  const{razorpay_payment_id, razorpay_order_id, razorpay_signature}=req.body;

 let body=razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto.createHmac('sha256', process.env.key_sec)
                                 .update(body.toString())
                                 .digest('hex');
                            


const isauthentic=expectedSignature===razorpay_signature;
if(isauthentic)
{
 
 const payment=new Payment({razorpay_payment_id,razorpay_order_id,razorpay_signature})
 await payment.save()
  res.status(200).json({razorpay_payment_id})
//res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`)
}
else{
  res.status(400).json({succes:false})
}
}
export const getkey=async(req,res,next)=>{
  res.status(200).json({key:process.env.key_id})
  
}

export const add = async (req, res, next) => {
  try {
    const { data } = req.body;
    const cart = await Cart.findOne({ owner: req.user.id });
    if(cart){
    const order = new Order({
      owner: req.user.id,
      product: cart.items,
      ordertotal: cart.total,
      Shipping: data,
    });
    await order.save();
  }
  else{
    res.status(500).json({ error:"erorr"})
  }
    const sales=await Sales.find()
    if(sales)
    {
      const reponse=await Sales.findOneAndUpdate({},{$inc:{totalsaleprice:cart.total}},{new:true})
    }
    else{
      try{
      const sales=new Sales({totalsaleprice:cart.total})
      }
      catch(err)
      {
        console.log(err)
      }
    }
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
