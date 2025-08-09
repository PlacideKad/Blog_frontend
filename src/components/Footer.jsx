const Footer=()=>{
  return (
    <footer className="bg-fuchsia-900 text-gray-300 py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Section 1 : Derniers articles */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Derniers articles</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Voyager seule en Italie
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                Secrets d’un pain croustillant
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-pink-400 transition">
                10 livres qui m’ont marquée
              </a>
            </li>
          </ul>
        </div>

        {/* Section 2 : Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Réseaux sociaux</h3>
          <p className="text-sm mb-3">
            Suivez ma sœur pour ses articles 📚 et moi pour mes lignes de code 💻
          </p>
          <div className="flex space-x-4">
            {/* Liens fictifs */}
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              Instagram ✨
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              Twitter 🐦
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition">
              GitHub 💻
            </a>
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
        © {new Date().getFullYear()} Blog de ma sœur — Développement par moi 😎
      </div>
    </footer>
  );
}

export default Footer;