import { useEffect , useContext } from "react";
import { NavbarButtonsContext } from "./App";

const LandingPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarButtonsContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
  },[])
  return(
    <div className="h-85/100 grow-1 w-full">
      <h1>Here is the landing page</h1>
    </div>
  )
}
export default LandingPage