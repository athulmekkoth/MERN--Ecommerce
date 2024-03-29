
import { useSelector } from "react-redux";
import {Link, Outlet} from "react-router-dom"
import axios from "axios"
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";


export default function Contactus()
{
      const[name,setName]=useState("")
      const[email,setEmail]=useState("")
      const[message,setMessage]=useState("")

const submit=()=>{
      try{
            const response=axios.post("/api/mesg/add",({name,email,message}))
            (response.status==200?alert("successfully uploaded"): <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />)
      }
      catch(err)
      {
            console.log(err)
      }
}

return(
   
        

 
      <div className="mt-24  text-gray-400 text-cente  w-[80%] mx-auto py-20 ">
       <h1 className="text-3xl pb-10">Have any question?<br></br> We will get back to you</h1>
    <div className="border-2 border-gray-500 p-12 w-1/2 mx-auto">
       <div className="flex flex-col" >
       <label  className="text-black" htmlFor="name" >Name</label>
       <input onChange={(e)=>setName(e.target.value)} className="border-2 border-grey hover:border-black pl-1 " type="text" placeholder="name" id="name" />
       </div>
       <div className="flex flex-col" >
       <label  className="text-black" htmlFor="email" >Email</label>
       <input onChange={(e)=>setEmail(e.target.value)} className="border-2 border-grey hover:border-black pl-1" type="text" placeholder="email" id="email" />
       </div>
       <div className="flex flex-col" >
       <label  className="text-black" htmlFor="message" >Message</label>
       <textarea className="border-2 border-gray-300" id="message" onChange={(e)=>setMessage(e.target.value)} name="postContent" />
       </div>
       <button onClick={submit} className="p-2 mt-3 text-white font-extralight border-none rounded-md bg-blue-400">Submit </button>
       </div>
      </div>



)
    

}