import { useEffect , useContext } from "react";
import { NavbarContext } from "./App";
const articles = [
  {
    id: 1,
    title: "Voyager seule à travers l’Italie : récit et conseils",
    summary:
      "Entre Rome et Venise, découvrez mes coups de cœur, mes bons plans, et les petites galères qui font tout le charme d’un voyage en solo.",
    category: "Voyage",
    coverImage:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Les secrets d’un pain maison croustillant",
    summary:
      "Faire du pain chez soi, ce n’est pas si compliqué ! Je vous donne ma recette et mes astuces pour une croûte dorée et une mie parfaite.",
    category: "Cuisine",
    coverImage:
      "https://images.unsplash.com/photo-1608198093002-0c13b67c47f9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "10 livres qui ont changé ma façon de voir le monde",
    summary:
      "De la philosophie à la fiction, voici une sélection d’ouvrages qui m’ont marquée et que je relis régulièrement.",
    category: "Lecture",
    coverImage:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Minimalisme : comment désencombrer sa vie",
    summary:
      "Réduire ses possessions pour mieux profiter de l’essentiel : je partage mon expérience et mes conseils pratiques.",
    category: "Lifestyle",
    coverImage:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Randonnée en montagne : guide pour débutants",
    summary:
      "De l’équipement à la préparation physique, tout ce qu’il faut savoir avant de partir à l’assaut des sentiers.",
    category: "Sport",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Photographie urbaine : capturer l’âme d’une ville",
    summary:
      "Conseils techniques et inspirations pour photographier l’architecture et la vie citadine.",
    category: "Art",
    coverImage:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=800&q=80",
  },
];

const ArticlesPage=()=>{
  const {handleButtonActive, setButtons}=useContext(NavbarContext);
  useEffect(()=>{
    setButtons((prev)=>handleButtonActive(prev,0));
  },[])
  return(
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Les articles de ma sœur 📚
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <span className="text-xs font-semibold text-white px-2 py-1 rounded bg-fuchsia-400 w-fit">
                {article.category}
              </span>
              <h2 className="mt-2 text-lg font-bold">{article.title}</h2>
              <p className="text-sm text-gray-600 mt-1 flex-1">
                {article.summary}
              </p>
              <button className="mt-3 text-fuchsia-400 font-semibold hover:underline">
                Lire →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}



export default ArticlesPage;