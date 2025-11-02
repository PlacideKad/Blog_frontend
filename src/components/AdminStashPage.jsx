import BlueprintArticlePage from "./utils/BlueprintArticlePage";
const AdminStashPage=()=>{
  return(
    <BlueprintArticlePage isPublished_={false} isAdmin_={true} limit_={12} />
  );
}
export default AdminStashPage;