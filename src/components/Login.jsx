import ButtonClikable from './utils/ButtonClikable';
import Title from './utils/Title';
import { useContext , useState } from 'react';
import { GlobalAppContext } from './App';

const Login=()=>{
  const {windowWidth,backendURL}=useContext(GlobalAppContext);
  const [isOnSigninScreen, setIsOnSigninScreen]=useState(true);
  return(
    <div className="absolute 
      w-full h-full
      flex items-center justify-center
      bg-fuchsia-50">
      <div className={`w-8/10 max-h-[300px] max-w-[600px] h-25/100 lg:w-7/10 
      flex flex-col items-center justify-evenly
      rounded-xl bg-fuchsia-100 ${windowWidth>1000?'hover:scale-102 shadow-login-hover':'shadow-login'}
      transition-all ease duration-300`}>

        <form 
        onSubmit={(e)=>{e.preventDefault()}}
        id="connect-with-username-password" 
        className='h-3/4 w-9/10 
        flex flex-col justify-evenly items-center relative'>
          <div id='username-zone'
          className={`flex h-4/10 w-full items-center ${windowWidth>530?'justify-between':'justify-center'}`}>
            {windowWidth>530&&
            <label htmlFor="email" 
            className='cursor-pointer w-15/100 h-full text-start grid content-center text-nowrap text-sm'>
            E-mail
            </label>}
            <input 
            placeholder={`${windowWidth<=530?'E-mail':''}`}
            id='email' 
            type="email" 
            className='w-75/100 bg-white text-black h-3/5
            pl-2 py-1 rounded-lg outline-none
            border-black border-2
            focus:scale-103
            focus:ring-2
            focus:ring-fuchsia-400
            focus:border-fuchsia-400
            transition-all ease duration-300' />
          </div>

          <div id='password-zone'
          className={`flex h-4/10 w-full items-center ${windowWidth>530?'justify-between':'justify-center'}`}>
            {windowWidth>530&&
            <label htmlFor="password" 
            className='cursor-pointer w-15/100 h-full text-start grid content-center text-nowrap text-sm'>
            Mot de passe
            </label>}
            <input 
            placeholder={`${windowWidth<=530?'Mot de passe':''}`}
            id='password' 
            type="password" 
            className='w-75/100 bg-white text-black h-3/5
            pl-2 py-1 rounded-lg outline-none
            border-black border-2
            focus:scale-103
            focus:ring-2
            focus:ring-fuchsia-400
            focus:border-fuchsia-400
            transition-all ease duration-300' />
          </div>

          <span className='self-end text-sm my-2 text-neutral-700 italic'>
              {isOnSigninScreen?
              "Vous n'avez pas de compte?":
              "Vous avez un compte?"}
              <button 
              onClick={()=>{setIsOnSigninScreen(prev=>!prev)}}
              className='mx-2 text-purple-800 cursor-pointer'>
              {isOnSigninScreen?
              "Créer un compte ici":
              "Connectez-vous ici"}
              </button>
          </span>
          <ButtonClikable 
            type='submit'
            p_style="rounded-md py-2 px-8"
            content='Se Connecter'/>
        </form>
      </div>
      <div className="absolute top-0 left-0">
        <Title windowWidth={windowWidth}/>
      </div>
    </div>
  )
}
export default Login