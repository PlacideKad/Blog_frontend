import { useEffect , useRef } from "react";

const CloudinaryUploadWidget=(className_)=>{
  const cloudinaryRef=useRef();
  const widgetRef=useRef();
  useEffect(()=>{
    cloudinaryRef.current=window.cloudinary;
    widgetRef.current=cloudinaryRef.current.createUploadWidget({
      cloudName:'dmipesfyo',
      uploadPreset:'ml_default'
    },(error,result)=>{
      console.log(result);
    });
  },[]);
  return(
    <button className={className_} onClick={()=>widgetRef.current.open()}>
      hello
    </button>
  )
}
export default CloudinaryUploadWidget;