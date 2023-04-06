import {additem,deleteitem,find,findbycat,getall} from "../controllers/Product.js";
import { verifyToken } from "../VerifyToken.js";
import {verifyTokenAdmin}  from "../VerifyToken.js";
import express from "express"
const productrouter=express.Router();
productrouter.post("/add",verifyTokenAdmin,additem)
productrouter.delete("/del",verifyTokenAdmin,deleteitem)
productrouter.get("/find/:id",verifyToken,find)

productrouter.get("/getall",verifyToken, getall)
export default productrouter;