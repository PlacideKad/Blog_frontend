import { useEffect , useRef , useContext } from "react";
import { GlobalAppContext } from "../App";
import { getCloudinaryLink , getDisplayNameFromCloudinaryLink } from "./cloudinaryLink";
import {removeFromCloudinary} from "./removeCloudinaryLink";
import { format } from "@cloudinary/url-gen/actions/delivery";

const CloudinaryUploadWidget=({className_,child_,user_id,upDateUserPicture_,setCover_,setAttachedFiles_,onClick_})=>{
  const cloudinaryRef=useRef();
  const widgetRef=useRef();
  const {setDisplayChangedCloudinaryRefresh , backendURL , setUser , user}=useContext(GlobalAppContext);
  useEffect(()=>{
    cloudinaryRef.current=window.cloudinary;
    widgetRef.current=cloudinaryRef.current.createUploadWidget({
      cloudName:'dmipesfyo',
      uploadPreset:'ml_default'
    },async(error,result)=>{
      if(result.event==='success'){
        const link=getCloudinaryLink(result?.info?.display_name,{fill:'c_fill',height:'h_500',width:'w_500'});//`https://res.cloudinary.com/dmipesfyo/image/upload/c_fill,h_550,w_550/${result?.info?.display_name}`;
        const data={picture:link};

        if(user_id && upDateUserPicture_){
          try{
            const res=await fetch(`${backendURL}/user/updateinfos`,{
              method:'PATCH',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({...data,id:user_id})
            });
            if(!res.ok) throw new Error('Error while updating the user profile picture');
            const resJson=await res.json();
            if(!resJson.updated) throw new Error(resJson.message);
            await removeFromCloudinary(getDisplayNameFromCloudinaryLink(user?.picture));
            setUser(resJson.user);
          }catch(err){
            console.log(err);
          }
        }else if(setCover_){
          // we must authenticate the user before setting the cover, think about adding an admin authentication middleware and an admin field to all the users
          setCover_(getCloudinaryLink(result?.info?.display_name));
        }else if(setAttachedFiles_){
          setAttachedFiles_(prev=>[...prev,{title:result?.info?.original_filename,link:getCloudinaryLink(result?.info?.display_name), display_name:result?.info?.display_name, format: result?.info?.format} ]);
        }
      }
      if(result.event==="display-changed" && result.info==='hidden') setDisplayChangedCloudinaryRefresh(prev=>!prev)
    });
  },[]);
  return(
    <div 
    className={className_} onClick={()=>{
      if (onClick_) onClick_();
      return widgetRef.current.open()}}>
      {child_}
    </div>
  )
}
export default CloudinaryUploadWidget;