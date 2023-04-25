import {deleteitem,find,findbycat,getall,del,addpic} from "../controllers/Product.js";
import { verifyToken } from "../VerifyToken.js";
import {verifyTokenAdmin}  from "../VerifyToken.js";
import  multerUploads  from "../controllers/multer.js";
import express from "express"
const productrouter=express.Router();
//productrouter.post("/add",additem)
productrouter.delete("/del",verifyTokenAdmin,del)
productrouter.get("/find/:id",verifyToken,find)
productrouter.get("/getall/:cat",verifyToken, findbycat)
productrouter.get("/getall/",verifyToken, getall)
productrouter.post("/addpic",multerUploads, addpic)
export default productrouter;