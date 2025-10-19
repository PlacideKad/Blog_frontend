export const removeFromCloudinary=async(publicId)=>{
  const backendURL='http://localhost:3000/api';
  try{
    const res=await fetch(`${backendURL}/remove_cloudinary`,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({publicId})
    });
    if(!res.ok) throw new Error('Error when removing orphan pictures from cloudinary');
    const resJson=await res.json();
    console.log(resJson);
    // return resJson.success for test
  }catch(err){
    console.log(err);
  }
}
