import { useEffect , useContext } from "react";
import { NavbarButtonsContext } from "./App";

const  MissingPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarButtonsContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
  },[])

  return(
    <h1>404 Page not found</h1>
  )
}
export default MissingPage