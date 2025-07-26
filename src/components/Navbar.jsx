import { Link } from 'react-router-dom';
import { useState , useEffect , useRef } from 'react';

const Navbar=()=>{
  /**
   * @param {name} String est le nom qui s'affiche au menu
   * @param {icon} String est le nom de classe de l'icone
   * @param {link} String est le path vers lequel on est dirigé en cliquant sur le button
   */
  const buttons=[{
    name:'Articles',
    link:'/articles',
    icon:'article',
    active:false},{

    name:'Admin',
    icon:'manage_accounts',
    link:'/dashboard',
    active:false},{

    name:'Thème'},{

    name:'A Propos',
    link:'/about',
    icon:'info',
    active:false}
  ];
  const [showSidebar,setShowSidebar]=useState(false);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const handleMenuClick=()=>{
    setShowSidebar(prev=>!prev);
  };
  const sidebarRef=useRef(null);
  const menubtnRef=useRef(null);
  const clickOutside=(event)=>{
    if(sidebarRef.current && !sidebarRef.current.contains(event.target) && !menubtnRef.current.contains(event.target)) setShowSidebar(false);
  }

  useEffect(()=>{
    if(showSidebar) document.addEventListener('click',clickOutside)
    else document.removeEventListener('click',clickOutside);
    return ()=>{
      document.removeEventListener('click',clickOutside)
    }
  },[showSidebar]);

  useEffect(()=>{
    const watchWindowWidth=()=>{
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize',watchWindowWidth);
    return ()=>{window.removeEventListener('resize',watchWindowWidth)}
  },[]);
  const handleButtonActive=(index)=>{
    if(index!=2){

    }
  }
  return(
    <nav 
      className={`w-full ${windowWidth<640?'h-1/10 min-h-20':'h-15/100 min-h-[40px] max-h-[150px]'} 
      relative
      flex items-center justify-between
    `}>
      <Link to='/home' className='w-2/10 h-full max-w-[250px]'>
        <div
          id="site-name"  
          className="w-full h-full
          flex items-center justify-start">
            Site name
        </div>
      </Link>
      <div
        id="sidebar"
        ref={sidebarRef}
        className={`${windowWidth>=640 && 'w-8/10'} ${windowWidth<640?'h-[90vh]':'h-full'} max-w-[900px] grow-1
        flex items-center justify-evenly
        ${windowWidth<640 &&`absolute -right-[400px] top-[10vh]
          flex flex-col items-center justify-evenly
          ${windowWidth<350 ? 'w-3/4':'w-5/10'} bg-purple-100 rounded-tl-3xl rounded-bl-3xl`}
        ${windowWidth<640 && showSidebar?'[transform:translateX(-400px)]':null} 
        transition-transform ease-linear duration-400`}>
          {
            buttons.map((button,index)=>{
              return(
                <Link key={index} to={button.link}>
                  <button 
                    className="px-3 py-1 border-b-4 border-black
                      flex items-center justify-evenly
                      hover:cursor-pointer
                      hover:bg-purple-400
                      hover:border-pink-200
                      hover:text-white
                      transition-all ease duration-200
                    "
                    onClick={()=>{handleButtonActive(index)}}
                    >
                      <span className={`${button.icon&& 'mx-1'}`}>{button.name}</span>
                      {button.icon && 
                        <span className='material-symbols-outlined text-inherit'>
                          {button.icon}
                        </span>
                      }
                  </button>
                </Link>
              )
            })
          }
          <button
            id="btn_connection"
            className="
            px-3 py-2
            rounded-md
            hover:cursor-pointer
            hover:scale-103
            transition-scale ease-in duration-200
            text-white bg-purple-400"
          >
            Connexion
          </button>
      </div>
      {windowWidth<640 &&
        <span 
          ref={menubtnRef}
          onClick={handleMenuClick}
          className="material-symbols-outlined text-purple-400 ![font-size:max(35px,10vw)]">
            {showSidebar?'close':'menu'}
        </span>
      }
    </nav>
  )
}
export default Navbar