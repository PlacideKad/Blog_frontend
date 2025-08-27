
export const getArticles=async(setFunction, backendURL, isPublished=true,limit=6,page=1,setTotalPages=undefined)=>{
  try{
    const res=await fetch(`${backendURL}/${isPublished?'articles':'admin/stashes'}/?${limit?`limit=${limit}`:' '}&${page&&`page=${page}`}`);
    if(!res.ok) throw new Error(`Error when fetching the ${isPublished?'articles':'stashes'}`);
    const resJson=await res.json();
    isPublished?setFunction(resJson.articles):setFunction(resJson);
    setTotalPages&&setTotalPages(resJson.nb_pages);
  }catch(err){
    console.log(err);
  }
};
