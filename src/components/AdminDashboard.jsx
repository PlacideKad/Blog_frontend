import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";

const AboutPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,1));
  },[])
  return(
    <p>This is the admin dash board</p>
  )
}
export default AboutPage;