import { useEffect , useRef , useContext } from "react";
import { GlobalAppContext } from "../App";

const CloudinaryUploadWidget=({className_,child_,user_id})=>{
  const cloudinaryRef=useRef();
  const widgetRef=useRef();
  const {setDisplayChangedCloudinaryRefresh , backendURL , setUser}=useContext(GlobalAppContext);
  useEffect(()=>{
    cloudinaryRef.current=window.cloudinary;
    widgetRef.current=cloudinaryRef.current.createUploadWidget({
      cloudName:'dmipesfyo',
      uploadPreset:'ml_default'
    },async(error,result)=>{
      if(result.event==='success'){
        const link=`https://res.cloudinary.com/dmipesfyo/image/upload/c_fill,h_550,w_550/${result?.info?.display_name}`;
        const data={picture:link};
        if(user_id){
          try{
            const res=await fetch(`${backendURL}/user/updateinfos`,{
              method:'PATCH',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({...data,id:user_id})
            });
            if(!res.ok) throw new Error('Error while updating the user profile picture');
            const resJson=await res.json();
            if(!resJson.updated) throw new Error(resJson.message);
            setUser(resJson.user);
          }catch(err){
            console.log(err);
          }
        }
      }
      if(result.event==="display-changed" && result.info==='hidden')console.log('refresh') //setDisplayChangedCloudinaryRefresh(prev=>!prev)
    });
  },[]);
  return(
    <div className={className_} onClick={()=>widgetRef.current.open()}>
      {child_}
    </div>
  )
}
export default CloudinaryUploadWidget;