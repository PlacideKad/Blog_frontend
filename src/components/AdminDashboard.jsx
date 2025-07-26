import { useEffect , useContext } from "react";
import { NavbarButtonsContext } from "./App";

const AdminDashboard=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarButtonsContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,1));
  },[])

  return(
    <div className="h-85/100 grow-1 w-full">
      <p>This is the admin dashboard</p>
    </div>
  );
}
export default AdminDashboard