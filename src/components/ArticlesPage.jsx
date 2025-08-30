import BlueprintArticlePage from "./utils/BlueprintArticlePage"
const ArticlesPage=()=>{
  return(
    <BlueprintArticlePage isPublished_={true} isAdmin_={false} limit_={6}/>
  );
}
export default ArticlesPage