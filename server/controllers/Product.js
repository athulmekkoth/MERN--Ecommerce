import Product from "../databases/Product.js";
export const additem= async(req,res,next)=>{
 
    const exist = await Product.findOne({ name: req.body.name, category: req.body.category });
    try{
    if(exist){
      
        res.status(404).json({ message: "item already present" });
    }
    else{
 
    const product = new Product(req.body);
    product.save();
    res.status(404).json({ message: "item saved" });
    }
}
catch(err)
{
    console.log(err)

}
}
export const deleteitem= async(req,res,next)=>{
 
    const exist = await Product.findOne({ name: req.body.name, category: req.body.category });
    try{
    if(exist){
        const deleteval =await Product.deleteOne(exist);
        res.status(404).json({ message: "item deleted" });
    }
    else{
 
    const product = new Product(req.body);
    product.save();
    res.status(404).json({ message: "item saved" });
    }
}
catch(err)
{
    console.log(err)

}
}