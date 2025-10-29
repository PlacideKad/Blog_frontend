import {useEffect,useState} from 'react';

const ErrorPopup=({message_,showState_,onCloseCallback_})=>{
  const [isVisible, setIsVisible]=useState(showState_);

  useEffect(()=>{
    if(showState_) setIsVisible(true);
  },[showState_]);

  const handleClose=()=>{
    setIsVisible(false);
    setTimeout(()=>onCloseCallback_?.(),200);
  };
  return(
    <>
    {isVisible &&(
      <div className={`fixed inset-0 flex items-start justify-center z-100 transition-opacity duration-200 ${showState_?'opacity-100':'opacity-0'}`}>
        {/* fond semi-transparent */}
        <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}></div>

        {/* Contenu du popup */}
        <div className='relative mt-24 w-[90%] max-w-sm bg-purple-100 text-gray-800 rounded-2xl shadow-xl p-5 animate-slideDown'>
          {/* bouton de fermeture */}
          <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer">
            <span className='material-symbols-outlined'>close</span>
          </button>

          {/* icone d'erreur */}
          <div className="flex flex-col items-center text-center space-y-3">
            <div className='w-12 h-12 flex items-center justify-center rounded-full bg-red-200'>
              <span className='material-symbols-outlined text-red-700 text-3xl'>error</span>
            </div>
            <p className='font-medium text-sm'>{message_}</p>
          </div>
        </div>

      </div>
    )}

    <style>{`
      @keyframes slideDown{
        0%{
          transform: translateY(-20px);
          opacity:0;
        }
        100%{
          transform:translateY(0);
          opacity:1;
        }
      }
      
      .animate-slideDown{
        animation:slideDown 0.25s ease-out;
      }
    `}</style>
    </>
  );
}
export default ErrorPopup