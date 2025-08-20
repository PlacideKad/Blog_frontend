import { useEffect , useContext } from "react";
import { GlobalAppContext } from "./App";

const AboutPage=()=>{
  const {handleButtonActive, setButtons}=useContext(GlobalAppContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,2));
  },[])
  return(
    <p>This is the about page</p>
  )
}
export default AboutPage;