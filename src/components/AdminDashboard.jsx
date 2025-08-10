import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";
import Title from "./utils/Title";

const AboutPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,1));
  },[])
  return(
    <div className="min-h-full w-full p-2 bg-fuchsia-50 text-gray-900 items-center justify-center relative z-0">

      {/** title */}
      <section className="absolute top-0 left-0">
        <Title windowWidth={window.innerWidth}/>
      </section>

      {/** left menu */}
      <div className="fixed left-2 top-1/2 transform -translate-y-1/2 w-1/10 h-2/10">
        <section className="floating-bar relative bg-transparent flex flex-col items-center justify-evenly [&>span]:!text-[2rem] [&>span]:!text-purple-800 h-full w-full rounded-md shadow-md shadow-gray-900 overflow-hidden">
          <span className="material-symbols-outlined">dynamic_feed</span>
          <span className="material-symbols-outlined">groups</span>
          <span className="material-symbols-outlined">contract_edit</span>
        </section>
      </div>

      <section className="flex flex-col">
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
        <p>Hello i'm a legend, yes i kmow it is impressive</p>
      </section>
    </div>
  )
}
export default AboutPage;