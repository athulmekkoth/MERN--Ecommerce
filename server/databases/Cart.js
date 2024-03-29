import mongoose, { mongo } from "mongoose";
const Cartschema= new mongoose.Schema({
    owner : {
        type: mongoose.Types.ObjectId,
         required: true,
         ref: 'User'
       },
       items: [{
        product: {
          type: mongoose.Types.ObjectId,
          required:true,
          ref:'Product',
          unique: true 
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1
        },
        name:{
          type:String,
          required:true
      },
      itemprice:{
        type:Number,
        required:true
      },
     price:{
        type:Number,
        required:true
      },
      photos:[{
        type: String 
      }
      ]
      }],
   
  
      total:{
        required:true,
        type:Number,
        default:0,
        min: 1
    }

})
export default mongoose.model("Cart",Cartschema)