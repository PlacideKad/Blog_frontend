
export const getArticles=async(setFunction, backendURL, isPublished=true)=>{
  try{
    const res=await fetch(`${backendURL}/${isPublished?'articles':'stashes'}`);
    if(!res.ok) throw new Error(`Error when fetching the ${isPublished?'articles':'stashes'}`);
    const resJson=await res.json();
    setFunction(resJson);
  }catch(err){
    console.log(err);
  }
};
