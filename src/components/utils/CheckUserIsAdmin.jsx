import { useContext } from "react";
import { GlobalAppContext } from "../App";
import { useNavigate, Outlet } from "react-router-dom";

const CheckUserIsAdmin =()=>{
  const {user}=useContext(GlobalAppContext);
  const navigate=useNavigate();
  if(!user || !user.isAdmin){
    navigate('/');//we should be redirected to the login as admin page. This is not definitive
  }
  return(<Outlet/>);
}
export default CheckUserIsAdmin;