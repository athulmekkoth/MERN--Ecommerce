import Product from "../databases/Product.js";
import cloudinary from "cloudinary"
import  multerUploads  from "../controllers/multer.js";
import dotenv from "dotenv"
import getDataUri from "../utils/dataUri.js";
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  
  export const addpic = async (req, res, next) => {
    const photos = [];

    const { name, category, count, price, description } = req.body;
    const exist = await Product.findOne({ name, category });
    if (exist) {
      return res.status(503).json({ message: "item already present" });
    }
    else{
    try {
      
      const files = req.files;
      console.log(req.files)
      const dataUris = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUri = getDataUri(file);
        dataUris.push(dataUri);
      }
  
      const results = await Promise.all(
        dataUris.map((dataUri) => cloudinary.v2.uploader.upload(dataUri.content))
      );
  
      for (let result in results) {
        photos.push(results[result].secure_url);
      }
      const { name, category, count, price, description } = req.body;
      if (typeof name !== "string" || typeof category !== "string") {
        return res.status(400).json({ message: "name and category must be strings" });
      }
      
    
  
      const product = new Product({ name, category, count, price, description, photos });
      await product.save();
      return res.status(200).json({ message: "item saved" });
    } catch (err) {
      console.log(err);
    console.log(err);
    }
  };
}
  
  
  
  

export const deleteitem= async(req,res,next)=>{
 
    const result = await Product.findById({ _id:req.body.productId });
   try{
    if(result){  

        await exist.deleteOne();
      
       return res.status(200).json({ message: "item deleted" });
    }
    else{

   return res.status(500).json({ message: "item noy prdent " });
    }
  
}
catch(err)
{
    console.log(err)

}
}
export const find= async(req,res,next)=>{

    const ids=req.params.id

    try{
        const exist = await Product.findById(ids);
        console.log(ids)
    if(!exist){

        
        res.status(400).json({ message: "item noy present " });
        
    }
    else{
        res.status(200).json({exist});

    }
    }

catch(err)
{
    console.log(err)

}
 }
 export const findbycat = async (req, res, next) => {
  try {
    const { cat } = req.params;
    const { sort } = req.query;

    let products = await Product.find({ category: cat });

    if (sort === 'lowest') {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sort === 'highest') {
      products = products.sort((a, b) => b.price - a.price);
    } else if (sort === 'asc') {
      products = products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'desc') {
      products = products.sort((a, b) => b.name.localeCompare(a.name));
    }

    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
};

 export const findbysearch=async(req,res,next)=>
 {
    console.log(req.query.page)
    try{
        const regex = new RegExp(req.query.page, "i");
        const exist= await Product.find({name: regex});
        if(exist)
        {
            res.status(200).json(exist)
        }
    } catch(err) {
        console.log(err);
    }
 }
 export const getall = async (req, res, next) => {
 
    try {
        const data= await Product.find();
    
      res.status(201).json({ data }); 
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error fetching data' });
    }
  };



 
  export const del = async (req, res, next) => {
 
    try {
        const data= await Product.findById(req.body.id)
        if(data)
        {
           await Product.findByIdAndDelete(req.body.id)


           console.log(`Deleted product with ID: ${req.body.id}`);
            res.status(201).json({message:"deleted successsfully"})
        }
    else{
        res.status(401).json({message:"item is not found"})
    }
   
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Error fetching data' });
    }
  };

  /////////////////////////////////
/* export const addpic = async (req, res, next) => {
    const photos = [];

    }
    else{
    try {
      
     
  
   
    
  
      const product = new Product({ name, category, count, price, description, photos });
      await product.save();
      return res.status(200).json({ message: "item saved" });
    } catch (err) {
      console.log(err);
    console.log(err);
    }
  };
}
  
  */
export const update=async(req,res,next)=>{
  const photos = [];

  const { name, category, count, price, description,ids} = req.body;

  const filter = await Product.findOne({_id:ids});
 
 
  if (filter) {

  try {
   
      const files = req.files;
      console.log(req.files+"files")
      const dataUris = [];
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const dataUri = getDataUri(file);
        dataUris.push(dataUri);
      }
  
      const results = await Promise.all(
        dataUris.map((dataUri) => cloudinary.v2.uploader.upload(dataUri.content))
      );
  
      for (let result in results) {
        photos.push(results[result].secure_url);
      }
      const { name, category, count, price, description } = req.body;
      if (typeof name !== "string" || typeof category !== "string") {
        return res.status(400).json({ message: "name and category must be strings" });
      }
      
    
 
   
    
const update={
  $set:{
    name, 
    category,
     count, 
     price,
      description,
     photos

  }
}
    const options = { new: true };
const updates=await Product.findByIdAndUpdate(filter,update,options)

    return res.status(200).json({ message: "item saved" });
  }
  
catch (err) {
    console.log(err);
  console.log(err);
  }
} 
else{
  console.log("sorry producr dosent exist")
  res.status(404).json({mesage:"please check"})
}
};