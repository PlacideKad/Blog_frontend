import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";

const AboutPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[])
  return(
    <p>This is the articles page</p>
  )
}
export default AboutPage;