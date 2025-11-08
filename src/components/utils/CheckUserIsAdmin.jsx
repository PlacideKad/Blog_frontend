import { useContext } from "react";
import { GlobalAppContext } from "../App";
import { useNavigate, Outlet } from "react-router-dom";

const CheckUserIsAdmin =()=>{
  const {user}=useContext(GlobalAppContext);
  const navigate=useNavigate();
  if(!user || !user.isAdmin){
    navigate('/');
  }
  return(<Outlet/>);
}
export default CheckUserIsAdmin;