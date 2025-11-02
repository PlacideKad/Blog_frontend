import { useContext } from "react";
import { GlobalAppContext } from "../App";
import { useNavigate } from "react-router-dom";

const CheckUserIsAdmin =()=>{
  const {user}=useContext(GlobalAppContext);
  const navigate=useNavigate();
  if(!user || !user.isAdmin){
    navigate('/loginasadmin');
  }
  return(<></>);
}
export default CheckUserIsAdmin;