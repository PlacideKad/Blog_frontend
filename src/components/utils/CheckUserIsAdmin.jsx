import { useContext, useEffect } from "react";
import { GlobalAppContext } from "../App";
import { useNavigate, Outlet } from "react-router-dom";
import Loader from "./Loader";

const CheckUserIsAdmin =()=>{
  const {user,userIsLoading}=useContext(GlobalAppContext);
  const navigate=useNavigate();
  if(userIsLoading){
    return(
    <div className="h-full w-full bg-fuchsia-50 flex items-center justify-center">
      <Loader message_="Vérification utilisateur..."/>
    </div>)
  }else{
    if(!user || !user.isAdmin){
      return navigate('/loginasadmin');//we should be redirected to the login as admin page. This is not definitive
    }else return(<Outlet/>);
  }
}
export default CheckUserIsAdmin;