import BlueprintArticlePage from "./utils/BlueprintArticlePage";
import CheckUserIsAdmin from "./utils/CheckUserIsAdmin";

const AdminArticlePage=()=>{
  return(
    <>
      <CheckUserIsAdmin/>
      <BlueprintArticlePage isPublished_={true} isAdmin_={true} limit_={12}/>
    </>
  );
}
export default AdminArticlePage;