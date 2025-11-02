import BlueprintArticlePage from "./utils/BlueprintArticlePage";
import CheckUserIsAdmin from "./utils/CheckUserIsAdmin";
const AdminStashPage=()=>{
  return(
    <>
      <CheckUserIsAdmin/>
      <BlueprintArticlePage isPublished_={false} isAdmin_={true} limit_={12} />
    </>
  );
}
export default AdminStashPage;