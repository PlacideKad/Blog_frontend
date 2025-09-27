import { useEffect, useContext, useState } from "react";
import { GlobalAppContext} from "./App";
import { getCloudinaryLink } from "./utils/getCloudinaryLink";
import contestWomen1 from "../img/landingPage/svg/Women's Day protest-cuate.svg";
import contestWomen2 from "../img/landingPage/svg/Women's Day protest-rafiki.svg";
import readingWoman from "../img/landingPage/svg/Book lover-bro.svg";
import speachWoman from '../img/landingPage/svg/Conference speaker-bro.svg';
import tree1 from '../img/landingPage/svg/cherry tree-amico.svg';
import tree2 from '../img/landingPage/svg/cherry tree-pana.svg';

const LandingPage=()=>{
  const feminists=[
    { link: getCloudinaryLink('AudreLorde_xq9ceo'), name: "Audre Lorde" },
    { link: getCloudinaryLink('Malala_ayfxco'), name: "Malala Yousafzai" },
    { link: getCloudinaryLink('MichelleObama_crocns'), name: "Michelle Obama" },
    { link: getCloudinaryLink('simoneDeBeauvoir_s1mjw3'), name: "Simone de Beauvoir" },
    { link: getCloudinaryLink('Opra_zbdqac'), name: "Oprah Winfrey" }
  ];
  const fillArray = () => [...feminists, ...feminists, ...feminists];

  const {handleButtonActive, setButtons,windowWidth}=useContext(GlobalAppContext);
  const [indexFocus,setIndexFocus]=useState(5);
  const [counter,setCounter]=useState(0);
  const [isCarousselMoving,setIsCarousselMoving]=useState(true);

  const carousselItem=fillArray();
  const handleMoveToLeft=()=>{
    setIsCarousselMoving(false);
    setCounter(prev=>(prev===-4?0:prev-1));
    setIndexFocus(prev=>(prev===9?5:prev+1));
    setTimeout(() => setIsCarousselMoving(true),3000);
  }
  const handleMoveToRight=()=>{
    setIsCarousselMoving(false);
    setCounter(prev=>(prev===4?0:prev+1));
    setIndexFocus(prev=>(prev===1?5:prev-1));
    setTimeout(() => setIsCarousselMoving(true),3000);
  }
  const translate_caroussel=(n)=> `translateX(${(n * 100) / 15}%)`;

  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev));
  },[]);

  useEffect(()=>{
    if(isCarousselMoving){
      const interval=setInterval(()=>{
        handleMoveToLeft();
      },2000);
      return ()=>clearInterval(interval);
    }
  },[counter,isCarousselMoving]);

  return(
    <div className="min-h-full w-full p-4 relative max-w-7xl mx-auto space-y-10 text-gray-900">

      {/*Intro*/}

      <section className="[text-align:justify] [text-justify:inter-word] px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-fuchsia-500">
          Bienvenue sur le <span className="italic">Site féministe</span>
        </h1>
        <p className="text-lg leading-relaxed">
          Un espace où le féminisme pulse, où chaque mot est un coup de poing contre
          l'invisible, et chaque image un éclat de résistance.
        </p>
      </section>

      {/* Images contestataires */}      

      <section id="pics"
      className="w-full lg:flex lg:items-center lg:justify-evenly">
        <img className="w-full lg:w-1/2 lg:h-auto" src={contestWomen1} alt="contesting women pic 1" />
        <img className="lg:w-1/2 lg:h-auto" src={contestWomen2} alt="contesting women pic 2" />
      </section>

      {/* Texte d'accroche */}

      <section className="text-justify px-4 md:px-0 text-lg leading-relaxed max-w-4xl mx-auto">
        <p>
          Ici, nous rallumons les flammes oubliées, célébrons les voix qui dérangent et tissons des ponts entre les luttes d'hier et celles d'aujourd'hui
        </p>
      </section>

      {/** Carrousel portraits feministes */}

      <section id="gallery" className={`flex flex-col items-center h-[min-content] lg:flex-row lg:justify-center lg:gap-4 `}>
        <img src={speachWoman} className="h-[20vh]" alt="conference speaker" />
        <div className={`${windowWidth<500?'w-full h-[30vh] max-h-[250px]':'[aspect-ratio:2/1] max-w-[600px] lg:max-w-[900px] w-85/100'} relative z-0 overflow-hidden`}>
          <div 
          style={{
            transform:translate_caroussel(counter),
            transition:'transform ease 400ms'
          }}
          className={`w-[500%] h-full flex items-center justify-evenly relative -left-4/3 top-0 z-0`} >
            {carousselItem.map((item,index)=>(
              <div key={index} 
              style={{
                filter:`${index!==(indexFocus)?'blur(2px)':''}`,
                scale:`${index!==(indexFocus)?'.90':'1.01'}`,
                transition:'scale ease 400ms'
              }}
              className="h-9/10 w-1/15 flex flex-col items-center justify-start z-0">
                <img src={item.link} alt={item.name} className={`h-9/10 w-9/10 [object-fit:cover] rounded-2xl md:rounded-4xl transition-all ease duration-300`} />
                <span className="text-[.7rem] md:text-[1rem]">{item.name}</span>
              </div>
            ))}
          </div>
          <button onClick={handleMoveToLeft} className="material-symbols-outlined cursor-pointer absolute left-0 top-1/2 z-1 bg-[rgba(0,0,0,.3)] text-white rounded-full p-2">chevron_left</button>
          <button onClick={handleMoveToRight} className="material-symbols-outlined cursor-pointer absolute right-0 top-1/2 z-1 bg-[rgba(0,0,0,.3)] text-white rounded-full p-2">chevron_right</button>
        </div>
      </section>

      {/* Section lecture avec image et texte */}

      <section className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 px-4 md:px-0 max-w-6xl mx-auto">
        <div
          id="text-lecture"
          className="text-justify md:w-1/3 md:h-1/2 p-6 rounded-lg bg-linear-45 from-fuchsia-300 to-purple-100 text-fuchsia-900 font-semibold shadow-md"
        >
          <p>
            Explorez des articles percutants sur le féminisme et ses luttes.
            <br />
            Plongez dans les œuvres de celles qui ont brisé les plafonds de verre avant
            nous.
            <br />
            Laissez-vous inspirer par des récits qui transforment la colère en pouvoir.
          </p>
        </div>
        <img
          src={readingWoman}
          className="md:w-2/3 md:max-h-[90vh] object-contain rounded-lg shadow-lg"
          alt="Reading woman"
        />
      </section>

      {/* Citation & arbres  */}

      <section className="px-4 md:px-0 max-w-5xl mx-auto space-y-6 text-center">
        <p className="text-lg font-semibold max-w-xl mx-auto leading-relaxed">
          Parce que le féminisme n'est pas qu'une idée. <br />
          C'est un mouvement, un art, une révolution quotidienne. <br />
          C'est une forêt :{" "}  
          <span className="[font-style:italic]">certaines</span> arbres tombent en faisant du bruit, d'autres poussent dans le silence...
        </p>
        <div id="trees-text" className="flex items-center justify-between [&>img]:h-15 md:[&>img]:h-60 lg:[&>img]:h-90">
          <img src={tree1} className="order-1" alt="tree pic 1"/>
          <img src={tree2} className="order-3" alt="tree pic 2"/>
          <span className="order-2 dancing-script-style text-2xl md:text-4xl text-fuchsia-800">...Ici nous écoutons les deux.</span>
        </div>
      </section>
      {/* <div id="last pics" className="flex w-full center items-center justify-center mt-50 [&>img]:w-25 md:[&>img]:w-70 lg:[&>img]:w-80">
        <img src={voting} alt="Voting women" />
        <img src={autonomy} alt="breaking chains" />
        <img src={emancipation} alt="women emancipation" />
      </div> */}
    </div>
  );
}
export default LandingPage