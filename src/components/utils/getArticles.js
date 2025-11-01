
export const getArticles=async(setFunction, backendURL, isPublished=true,limit=6,page=1,setTotalPages=undefined,search_input=null,exact=false,sort_by='createdAt',order=1,loadingStateCallback, errorMessageCallback)=>{
  try{
    loadingStateCallback?.(true);
    const res=await fetch(`${backendURL}/${isPublished?'articles':'admin/stashes'}/?${limit?`limit=${limit}`:' '}&${page&&`page=${page}`}&${(sort_by && order)?`order=${order}&sort_by=${sort_by}`:" "}${search_input?.trim()?`&search=${search_input.trim()}&exact=${exact?1:0}`:''}`);
    if(!res.ok) throw new Error(`Error when fetching the ${isPublished?'articles':'stashes'}`);
    const resJson=await res.json();
    if(!resJson.success) setFunction([]);
    search_input?.trim()?setFunction(resJson.foundData):isPublished?setFunction(resJson.articles):setFunction(resJson.stashes);
    (setTotalPages&&!search_input?.trim())?setTotalPages(resJson.nb_pages):setTotalPages(null);
  }catch(err){
    console.log(err);
    errorMessageCallback(err);
  }finally{loadingStateCallback(false);}
};
