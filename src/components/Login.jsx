import ButtonClikable from './utils/ButtonClikable';
import Title from './utils/Title';
import { useContext , useState } from 'react';
import { GlobalAppContext } from './App';

const Login=()=>{
  const {windowWidth,backendURL}=useContext(GlobalAppContext);
  const [connectToAccount,setConnectToAccount]=useState(true);
  return(
    <div className="absolute 
      w-full h-full
      flex items-center justify-center
      bg-fuchsia-50">
      <div className={`w-8/10 max-h-[600px] h-4/10 sm:w-6/10 lg:w-5/10 
      flex flex-col items-center justify-evenly
      rounded-xl bg-fuchsia-100
      shadow-md shadow-fuchsia-200 transition-all ease duration-200`}
      >

        <form 
        id="connect-with-username-password" 
        className='h-1/2 w-9/10 
        flex flex-col justify-evenly items-center relative'>
          <div id='username-zone'
          className='flex h-4/10 w-full items-center justify-between'>
            <label htmlFor="username" 
            className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
            Nom utilisateur
            </label>
            <input 
            id='username' 
            type="text" 
            className='w-75/100 bg-white text-black h-3/5
            pl-2 py-1 rounded-lg outline-none
            border-black border-2
            focus:scale-103
            focus:ring-2
            focus:ring-fuchsia-400
            focus:border-fuchsia-400
            transition-all ease duration-300
            ' />
          </div>

          <div id='password-zone'
          className='flex h-4/10 w-full items-center justify-between'>
            <label htmlFor="password" 
            className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
            Mot de passe
            </label>
            <input 
            id='password' 
            type="password" 
            className='w-75/100 bg-white text-black h-3/5
            pl-2 py-1 rounded-lg outline-none
            border-black border-2
            focus:scale-103
            focus:ring-2
            focus:ring-fuchsia-400
            focus:border-fuchsia-400
            transition-all ease duration-300
            ' />
          </div>

          {
            !connectToAccount?

            <div id='repeat-password-zone'
            className='flex h-4/10 w-full items-center justify-between'>
              <label htmlFor="repeat-password" 
              className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
              Repeter mot de passe
              </label>
              <input 
              id='repeat-password' 
              type="password" 
              className='w-75/100 bg-white text-black h-3/5
              pl-2 py-1 rounded-lg outline-none
              border-black border-2
              focus:scale-103
              focus:ring-2
              focus:ring-fuchsia-400
              focus:border-fuchsia-400
              transition-all ease duration-300
              ' />
            </div>:null
          }  


          <ButtonClikable 
            type='submit'
            p_style="rounded-md py-2 px-8"
            content='Submit'/>
        </form>
      </div>
      <div className="absolute top-0 left-0">
        <Title windowWidth={windowWidth}/>
      </div>
    </div>
  )
}
export default Login