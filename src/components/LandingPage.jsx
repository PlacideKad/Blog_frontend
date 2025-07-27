import { useEffect , useContext } from "react";
import { NavbarButtonsContext } from "./App";

const LandingPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarButtonsContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
  },[])
  return(
    <div className={`h-85/100 grow-1 w-full overflow-auto
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:bg-purple-200
      [&::-webkit-scrollbar-track]:rounded-full

      [&::-webkit-scrollbar-thumb]:bg-purple-400
      [&::-webkit-scrollbar-thumb]:rounded-full
    `}>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
      <h1>Here is the landing page</h1>
    </div>
  )
}
export default LandingPage