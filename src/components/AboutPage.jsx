import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";

const AboutPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,3));
  },[])
  return(
    <div className="h-85/100 grow-1 w-full">
      <p>This is the about page</p>
    </div>
  )
}
export default AboutPage;