export const removeFromCloudinary=async(publicId,backendURL)=>{
  try{
    const res=await fetch(`${backendURL}/remove_cloudinary`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({publicId})
    });
    if(!res.ok) throw new Error('Error when removing orphan pictures from cloudinary');
  }catch(err){
    console.log(err);
  }
}
