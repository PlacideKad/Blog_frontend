export const getUsers=async(setFunction,backendURL)=>{
  try{
    const res=await fetch(`${backendURL}/admin/users`);
    if(!res.ok) throw new Error('Error while fetching the users')
    const resJson=await res.json();
    setFunction(resJson.foundUsers);
  }catch(err){
    console.log(err);
  }
}
