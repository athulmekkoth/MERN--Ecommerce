import Product from "../databases/Product.js";
export const additem= async(req,res,next)=>{
 
    const exist = await Product.findOne({ name: req.body.name, category: req.body.category });
    try{
    if(exist){
      
        res.status(500).json({ message: "item already present" });
    }
    else{
 
    const product = new Product(req.body);
    product.save();
    res.status(200).json({ message: "item saved" });
    }
}
catch(err)
{
    console.log(err)

}
}
export const deleteitem= async(req,res,next)=>{
 
    const result = await Product.findById({ _id: productId });
    try{
    if(result){

        await exist.deleteOne();
      
        res.status(200).json({ message: "item deleted" });
    }
    else{

    res.status(500).json({ message: "item noy prdent " });
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
 export const findbycat=async(req,res,next)=>
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


 
 export const add=  async(req,res,next)=>{
    const exist = await Product.fi

 }

