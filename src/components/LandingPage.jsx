import { useEffect , useContext ,useState ,useRef} from "react";
import { NavbarContext , WindowSizeContext } from "./App";

import contestWomen1 from "../img/landingPage/svg/Women's Day protest-cuate.svg";
import contestWomen2 from "../img/landingPage/svg/Women's Day protest-rafiki.svg";
import readingWoman from "../img/landingPage/svg/Book lover-bro.svg";
import speachWoman from '../img/landingPage/svg/Conference speaker-bro.svg';
import tree1 from '../img/landingPage/svg/cherry tree-amico.svg';
import tree2 from '../img/landingPage/svg/cherry tree-pana.svg';
import autonomy from '../img/landingPage/svg/autonomy-pana.svg';
import emancipation from '../img/landingPage/svg/Emancipation of women-cuate.svg';
import voting from '../img/landingPage/svg/Voting-bro.svg';
import audrelorde from '../img/landingPage/people/AudreLorde.jpg';
import malala from '../img/landingPage/people/Malala.jpg';
import michelleobama from '../img/landingPage/people/MichelleObama.jpg';
import simone from '../img/landingPage/people/simoneDeBeauvoir.jpg';
import oprah from '../img/landingPage/people/Opra.jpg';
const LandingPage=()=>{
  const feminists=[
    {
      img : audrelorde,
      name : 'Audre Lorde'
    },
    {
      img : malala,
      name : 'Malala Yousafzai'
    },
    {
      img : michelleobama,
      name : 'Michelle Obama'
    },
    {
      img : simone,
      name : 'Simone de Beauvoir'
    },
    {
      img :oprah,
      name : 'Oprah Winfrey'
    },
  ];
  const fill_array=()=>{
    const new_array=feminists.concat(feminists).concat(feminists);
    return new_array
  }
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  const {windowWidth}=useContext(WindowSizeContext);
  const [indexFocus,setIndexFocus]=useState(5);
  const [counter,setCounter]=useState(0);
  const [isCarousselMoving,setIsCarousselMoving]=useState(true);

  const carousselItem=fill_array();
  const handleMoveToLeft=()=>{
    setIsCarousselMoving(false);
    setCounter(prev=>{
      if(prev===-4){
        return 0;
      }else return prev-1;
    });
    setIndexFocus(prev=>{
      if(prev===9)return 5;
      else return prev+1;
    });
    setTimeout(()=>{
      setIsCarousselMoving(true);
    },3000);
  }
  const handleMoveToRight=()=>{
    setIsCarousselMoving(false);
    setCounter(prev=>{
      if(prev===4) return 0;
      else return prev+1;
    });
    setIndexFocus(prev=>{
      if(prev===1) return 5;
      else return prev-1
    });
    setTimeout(()=>{
      setIsCarousselMoving(true);
    },3000);
  }
  const translate_caroussel=(n)=>{
    return `translateX(${(n * 100) / 15}%)`;
  }
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
  },[counter,isCarousselMoving])
  return(
    <div className="min-h-full w-full p-2 relative">
      <div className="[text-align:justify] [text-justify:inter-word]">
        <span className="dancing-script-style text-4xl text-purple-400">B</span>
        ienvenue sur le <span className="dancing-script-style text-4xl text-purple-400">S</span>ite féministe, un espace où le féminisme pulse, où chaque mot est un coup de poing contre l'invisible, et chaque image, un éclat de résistance
      </div>
      <div id="pics"
      className="w-full lg:flex lg:items-center lg:justify-evenly">
        <img className="w-full lg:w-1/2 lg:h-auto" src={contestWomen1} alt="contesting women pic 1" />
        <img className="lg:w-1/2 lg:h-auto" src={contestWomen2} alt="contesting women pic 2" />
      </div>
      <div className="text-justify">
        Ici, nous rallumons les flammes oubliées, célébrons les voix qui dérangent et tissons des ponts entre les luttes d'hier et celles d'aujourd'hui
      </div>
      <div id="gallery" className={`flex flex-col items-center h-[min-content] lg:flex-row lg:justify-center lg:gap-4 `}>
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
                <img src={item.img} alt={item.name} className={`h-9/10 w-9/10 [object-fit:cover] rounded-2xl transition-all ease duration-300`} />
                <span className="text-[.8rem] md:text-[1rem]">{item.name}</span>
              </div>
            ))}
          </div>
          <button onClick={handleMoveToLeft} className="material-symbols-outlined absolute left-0 top-1/2 z-1 bg-[rgba(0,0,0,.3)] text-white rounded-full p-2">chevron_left</button>
          <button onClick={handleMoveToRight} className="material-symbols-outlined absolute right-0 top-1/2 z-1 bg-[rgba(0,0,0,.3)] text-white rounded-full p-2">chevron_right</button>
        </div>
      </div>
      <div className='w-full md:flex md:items-center'>
        <div id="text-lecture" className='text-justify md:w-1/3 md:h-1/2 background-flowers'>
          Explorez des articles percutants sur le féminisme et ses luttes. <br />
          Plongez dans les oeuvres de celles qui ont brisé les plafonds de verre avant nous. <br />
          Et laissez-vous inspirer par des récits qui transforment la colère en pouvoir. <br />
        </div>
        <img src={readingWoman} className="md:w-2/3 md:max-h-[90vh]" alt="reading woman" />
      </div>
      <div className="">
        <div className="text-justify md:px-50">
          Parce que le féminisme n'est pas qu'une idée.
          C'est un mouvement, un art, une révolution quotidienne.
          C'est une forêt : <span className="[font-style:italic]">certaines</span> arbres tombent en faisant du bruit, d'autres poussent dans le silence...
        </div>
        <div id="trees-text" className="flex items-center justify-between [&>img]:h-15 md:[&>img]:h-60 lg:[&>img]:h-90">
          <img src={tree1} className="order-1" alt="tree pic 1"/>
          <img src={tree2} className="order-3" alt="tree pic 2"/>
          <span className="order-2 dancing-script-style text-2xl md:text-4xl">...Ici nous écoutons les deux.</span>
        </div>
      </div>
      <div id="last pics" className="flex w-full center items-center justify-center mt-50 [&>img]:w-25 md:[&>img]:w-70 lg:[&>img]:w-80">
        <img src={voting} alt="Voting women" />
        <img src={autonomy} alt="breaking chains" />
        <img src={emancipation} alt="women emancipation" />
      </div>
    </div>
  );
}
export default LandingPage