// import googleImg from '../img/loginPage/icons8-google.svg';
// import xImg from '../img/loginPage/icons8-x.svg';
// import ButtonClikable from './utils/ButtonClikable';
// import Title from './utils/Title';
// import { useContext , useState } from 'react';
// import { GlobalAppContext } from './App';

// const Login=()=>{
//   const {windowWidth,backendURL}=useContext(GlobalAppContext);
//   const [connectToAccount,setConnectToAccount]=useState(true);
//   const handleAuth=async (namesocial)=>{
//     window.location.href=`${backendURL}/auth/${namesocial}`;
//   }
//   return(
//     <div className="absolute 
//       w-full h-full
//       flex items-center justify-center
//       bg-fuchsia-50">
//       <div className={`w-8/10 max-h-[600px] h-4/10 sm:w-6/10 lg:w-5/10 
//       flex flex-col items-center justify-evenly
//       rounded-xl bg-fuchsia-100
//       shadow-md shadow-fuchsia-200 transition-all ease duration-200`}
//       >
//         {/* Connect with google button */}
//         <div 
//         onClick={()=>{handleAuth('google')}}
//         className='h-1/5 max-h-[60px] cursor-pointer w-9/10 rounded-full flex items-center justify-center space-x-3 bg-purple-400 text-neutral-100 shadow-sm shadow-neutral-700 hover:bg-purple-500 hover:text-neutral-100 transition-all ease duration-200'>
//           <span>Se connecter avec Google</span>
//           <img src={googleImg} alt=" google logo" />
//         </div>

// {/* 
//         <div className='h-1/20 w-9/10
//           flex items-end '>
//           <hr className='w-45/100 h-1/2 grid content-center border-fuchsia-400' /> 
//             <span className='w-1/10 h-full grid content-center text-center'>Ou</span>
//           <hr className='w-45/100 h-1/2 grid content-center border-fuchsia-400' />
//         </div>

//         <div 
//         onClick={()=>{setConnectToAccount(!connectToAccount)}}
//         className='text-[.8rem] text-purple-500 cursor-pointer self-end mx-8'>
//           {connectToAccount?"Vous n'avez pas de compte?":"Vous avez déjà un compte?"}
//         </div>

//         <form 
//         id="connect-with-username-password" 
//         className='h-1/2 w-9/10 
//         flex flex-col justify-evenly items-center relative'>
//           <div id='username-zone'
//           className='flex h-4/10 w-full items-center justify-between'>
//             <label htmlFor="username" 
//             className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
//             Nom utilisateur
//             </label>
//             <input 
//             id='username' 
//             type="text" 
//             className='w-75/100 bg-white text-black h-3/5
//             pl-2 py-1 rounded-lg outline-none
//             border-black border-2
//             focus:scale-103
//             focus:ring-2
//             focus:ring-fuchsia-400
//             focus:border-fuchsia-400
//             transition-all ease duration-300
//             ' />
//           </div>

//           <div id='password-zone'
//           className='flex h-4/10 w-full items-center justify-between'>
//             <label htmlFor="password" 
//             className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
//             Mot de passe
//             </label>
//             <input 
//             id='password' 
//             type="password" 
//             className='w-75/100 bg-white text-black h-3/5
//             pl-2 py-1 rounded-lg outline-none
//             border-black border-2
//             focus:scale-103
//             focus:ring-2
//             focus:ring-fuchsia-400
//             focus:border-fuchsia-400
//             transition-all ease duration-300
//             ' />
//           </div>

//           {
//             !connectToAccount?

//             <div id='repeat-password-zone'
//             className='flex h-4/10 w-full items-center justify-between'>
//               <label htmlFor="repeat-password" 
//               className='cursor-pointer w-15/100 h-full text-center grid content-center text-nowrap text-sm'>
//               Repeter mot de passe
//               </label>
//               <input 
//               id='repeat-password' 
//               type="password" 
//               className='w-75/100 bg-white text-black h-3/5
//               pl-2 py-1 rounded-lg outline-none
//               border-black border-2
//               focus:scale-103
//               focus:ring-2
//               focus:ring-fuchsia-400
//               focus:border-fuchsia-400
//               transition-all ease duration-300
//               ' />
//             </div>:null
//           }  


//           <ButtonClikable 
//             type='submit'
//             p_style="rounded-md py-2 px-8"
//             content='Submit'/>
//         </form> */}
//       </div>
//       <div className="absolute top-0 left-0">
//         <Title windowWidth={windowWidth}/>
//       </div>
//     </div>
//   )
// }
// export default Login