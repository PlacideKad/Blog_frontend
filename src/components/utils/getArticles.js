
export const getArticles=async(setArticlesFunction, backendURL)=>{
  try{
    const res=await fetch(`${backendURL}/articles`);
    if(!res.ok) throw new Error('Error when fetching the articles');
    const resJson=await res.json();
    setArticlesFunction(resJson);
  }catch(err){
    console.log(err);
  }
};
