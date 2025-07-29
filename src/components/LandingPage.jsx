import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";

const LandingPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
  },[]);

  return(
    <div className="min-h-full w-full p-2">
      <div>
        Bienvenue sur le site féministe, un espace où le féminisme pulse, où chaque mot est un coup de poing contre l'invisible, et chaque image, un éclat de résistance
      </div>
      <div id="pics"></div>
      <div>
        Ici, nous rallumons les flammes oubliées, célébrons les voix qui dérangent et tissons des ponts entre les luttes d'hier et celles d'aujourd'hui
      </div>
      <div id="gallery"></div>
      <div>
        Explorez des articles percutants sur le féminisme et ses luttes. <br />
        Plongez dans les oeuvres de celles qui ont brisé les plafonds de verre avant nous. <br />
        Et laissez-vous inspirer par des récits qui transforment la colère en pouvoir. <br />
      </div>
      <div>
        Parce que le féminisme n'est pas qu'une idée.
        C'est un mouvement, un art, une révolution quotidienne.
        C'est une forêt : certaines arbres tombent en faisant du bruit, d'autres poussent dans le silence...
        <div className="trees">
          <img src="./img/utils/svg/cherry tree-amico.svg" alt=""/>
          <img src="./img/utils/svg/cherry tree-bro.svg" alt=""/>
          <span class="last-word">...Ici nous écoutons les deux.</span>
        </div>
      </div>
      <div id="last pics"></div>
    </div>
  );
}
export default LandingPage