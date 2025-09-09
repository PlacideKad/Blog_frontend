import xIcon from '../img/footer/icons8-x.svg';
import instaIcon from '../img/footer/instagram-svgrepo-com.svg';
import tiktokIcon from '../img/footer/tiktok-svgrepo-com.svg';
import { useEffect , useState , useContext } from 'react';
import { GlobalAppContext } from './App';
import { Link } from 'react-router-dom';

const Footer=()=>{
  const [recentTitles,setRecentTitles]=useState([]);
  const {backendURL}=useContext(GlobalAppContext);
  useEffect(()=>{
    const getRecentTitles=async()=>{
      try{
        const res=await fetch(`${backendURL}/articles/titles`);
        if(!res.ok) throw new Error('Error occured when fetching articles titles');
        const resJson=await res.json();
        setRecentTitles(resJson.titles);
      }catch(err){
        console.log(err);
      }
    }
    (async()=>{await getRecentTitles()})();
  },[])
  return (
    <footer className="bg-fuchsia-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1 : Derniers articles */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Derniers articles</h3>
          {
            recentTitles.length>0&&
            <ul className="space-y-2 text-sm">
            {
              recentTitles.map((title,key)=>(
              <li key={key}>
                <Link to={`/articles/${title._id}`} className="hover:text-pink-400 transition">
                  {title.title}
                </Link>
              </li>
              ))
            }
            </ul>
          }
        </div>

        {/* Section 2 : Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h3>
          <p className="text-sm mb-3">
            Suivez nous sur les réseaux pour agrandir notre communauté et nous soutenir dans notre travail
          </p>
          <div className="flex space-x-4">
            {/* Liens fictifs */}
            <div 
            href="https://instagram.com" target="_blank" rel="noreferrer" 
            className="hover:text-pink-400 transition flex items-center justify-evenly space-x-1">
              <span className='cursor-pointer'>Instagram</span> 
              <img 
              className='w-6 h-6'
              src={instaIcon} 
              alt="instagram icon" />
            </div>

            <div 
            href="https://tiktok.com" target="_blank" rel="noreferrer" 
            className="hover:text-pink-400 transition flex items-center justify-evenly space-x-1">
              <span className='cursor-pointer'>TikTok</span> 
              <img 
              className='w-6 h-6'
              src={tiktokIcon} 
              alt="instagram icon" />
            </div>

            <div 
            href="https://X.com" target="_blank" rel="noreferrer" 
            className="hover:text-pink-400 transition flex items-center justify-evenly space-x-1">
              <span className='cursor-pointer'>X</span> 
              <img 
              className='w-6 h-6 bg-white rounded-sm'
              src={xIcon} 
              alt="instagram icon" />
            </div>
          </div>
        </div>

        {/* Section 3 : Suggestions */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Vos suggestions</h3>
          <p className="text-sm mb-3">
            Une idée ? Un sujet que vous voulez voir traité ? Envoyez-nous un mot !
          </p>
          <form className="flex flex-col space-y-3">
            <input
              type="text"
              placeholder="Votre suggestion..."
              className="px-3 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-fuchsia-400"
            />
            <button
              type="submit"
              className="bg-fuchsia-500 text-white py-2 rounded hover:bg-fuchsia-600 hover:scale-103 hover:cursor-pointer transition"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-100 pt-4 text-center text-xs text-gray-100">
        © {new Date().getFullYear()} Blog feministe
      </div>
    </footer>
  );
}

export default Footer;