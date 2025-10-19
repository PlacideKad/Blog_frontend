import { useContext } from "react";
import { GlobalAppContext } from "../App";

export const removeFromCloudinary=async(publicId)=>{
  const {backendURL}=useContext(GlobalAppContext);
  try{
    const res=await fetch(`${backendURL}/removeCloudinary`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({publicId})
    });
    if(!res.ok) throw new Error('Error when removing orphan pictures from cloudinary');
    const resJson=await res.json();
    console.log(resJson);
  }catch(err){
    console.log(err);
  }
}