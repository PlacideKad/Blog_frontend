import { useEffect , useContext } from "react";
import { GlobalAppContext} from "./App";

const  MissingPage=()=>{
  const {handleButtonActive, setButtons, setShowNavbar}=useContext(GlobalAppContext);
  setShowNavbar(false);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
  },[])

  return(
    <h1>404 Page not found</h1>
  )
}
export default MissingPage