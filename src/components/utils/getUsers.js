export const getUsers=async(setFunction,backendURL,searchInput,loadingStateCallback,errorMessageCallback,sort_by='createdAt',order=-1,exact=false)=>{
  try{
    const res=await fetch(`${backendURL}/admin/users/?sort_by=${sort_by}&order=${order}${searchInput?.trim()?`&search=${searchInput.trim()}&exact=${exact?1:0}`:" "}`);
    if(!res.ok) throw new Error('Error while fetching the users')
    const resJson=await res.json();
    setFunction(resJson.data);
  }catch(err){
    console.log(err);
    errorMessageCallback?.(err);
  }finally{
    setTimeout(() => {
      loadingStateCallback?.(false);
    },1000);
  }
}
