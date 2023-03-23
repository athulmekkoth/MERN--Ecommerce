import React, { useEffect, useState ,useRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../redux/authslice.js";
import { AiOutlineCloseCircle, AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import cart from "../assets/images/cart.png";
import { TfiMenu } from "react-icons/tfi";
;
export default function Navbar()
{
  

  const handleOpen = () => {
    console.log(on)
    setOn(!on);
  };
    
      
    const dispatch=useDispatch();
    const log=async()=>{
        console.log("clicled")
        dispatch(logOut())
        


    }
    const {currentUser}=useSelector((state)=>state.user)
   
    const [open,setopen]=React.useState(false)

    let authLink = currentUser ? 
  { name: "Logout" ,onclick:log} 
  : { name: "Login", link: "/login" };

  let activity = currentUser ? { name: "My Account", link: "/myaccount" } : null;

    let Links =[
        {name:"Home" ,link:"/"},

        {name:"Headphone" ,link:"/head"},
        {name:"Speaker" ,link:"/speak"},
        {name:"Earphone"  ,link:"/ear"},
        
  
     
      
    ]
    const change=()=>{
        setopen(!open)

    }

      const [on, setOn] = useState(false);
      
      const toggleDropdown = () => {
        setOn(!on);
      };
    return(
      <>
      <div className="bg-black h-12">
        <div className="z-5000 fixed shadow-md w-full top-0 left-0">
          <div className="lg:flex bg-black py-4 md:justify-around items-center">
            <div className="text-2xl flex justify-between px-3 pt-2 text-white cursor-pointer font-[Poppins]">audiophile
            <div onClick={change} className=" lg:hidden  w-9 inline-block  ">
    {open ?     <span  className=""><AiOutlineCloseCircle/></span>:    <span  className=""><TfiMenu/></span>}


   </div>
   </div>
            <ul className={`lg:flex md:items-center ${open ? "" : "hidden"}`}>
              {Links.map((link) => (
                <li className="my-7 ml-8 text-xl" key={link.name}>
                  <a href={link.link} className="text-white hover:text-yellow-500 duration-1000">
                    {link.name}
                  </a>
                </li>
              ))}
          {currentUser ? (
  <li className="my-7 ml-8 text-xl relative">
    <button onClick={toggleDropdown} className="text-white hover:text-yellow-500 duration-1000">
 Account
    </button>
    <ul className={`absolute top-full left-0 bg-black ${on ? "" : "hidden"}`}>
      <li className="my-2 ml-2 text-white">
        <button  onClick={log}>Logout</button>
      </li>
      <li className="my-2 ml-2 text-white">
        <a href="#">My-Account</a>
      </li>
    </ul>
  </li>
) : (
  <li className="text-xl my-7 ml-8 text-white">
    <a href="/login">Login</a>
  </li>
)}
            </ul>
            <Link to="/cart">
              <button className="absolute top-6 right-16 text-white cursor-pointer text-2xl lg:flex items-center lg:top-9">
                <AiOutlineShoppingCart />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}