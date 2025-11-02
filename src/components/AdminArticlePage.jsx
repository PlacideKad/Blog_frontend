import BlueprintArticlePage from "./utils/BlueprintArticlePage";

const AdminArticlePage=()=>{
  return(
    <BlueprintArticlePage isPublished_={true} isAdmin_={true} limit_={12}/>
  );
}
export default AdminArticlePage;