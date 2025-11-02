import Title from "./utils/Title";
import { useContext } from "react";
import { GlobalAppContext } from "./App";
import ButtonClikable from "./utils/ButtonClikable";
const LoginAsAdmin=()=>{
  const {windowWidth, handleAuth}=useContext(GlobalAppContext);
  return(
    <div className="min-h-screen w-full bg-fuchsia-50 relative flex flex-col items-center justify-center">
      <div className="absolute sm:text-xl top-0 left-0 w-full flex items-center justify-between p-4">
        <Title windowWidth={windowWidth}/>
        <ButtonClikable
          content='Se connecter'
          onclick={async()=>{await handleAuth('google')}}
          p_style='p-2 mx-1 rounded-md'/>
      </div>
      <div className="flex flex-row items-center justify-center gap-6">
        <span className="material-symbols-outlined !text-9xl !text-red-600">gpp_bad</span>
        <div className="flex flex-col items-start justify-center gap-4">
          <p className="text-3xl font-bold text-purple-600">Page non disponible</p>
          <p>Veuillez vous reconnecter a votre compte
            <span
            onClick={async()=>{await handleAuth('google')}}
            className="text-purple-600 cursor-pointer"> Administrateur
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginAsAdmin;