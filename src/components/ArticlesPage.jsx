import { useEffect , useContext } from "react";
import { NavbarButtonsContext } from "./App";

const ArticlesPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarButtonsContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[])
  return(
    <div className="h-85/100 grow-1 w-full">
      Here is the articles page
    </div>
  )
}
export default ArticlesPage