import { useEffect , useContext } from "react";
import { GlobalAppContext } from "./App";

const AboutPage=()=>{
  const {handleButtonActive, setButtons}=useContext(GlobalAppContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,1));
  },[]);
  return(
    <div className="h-full w-full">
      
    </div>
  )
}
export default AboutPage;