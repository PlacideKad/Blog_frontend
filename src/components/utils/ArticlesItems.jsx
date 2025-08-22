import { useNavigate } from "react-router-dom";
const ArticlesItem=({articlesList,readOnClick,bottomText})=>{
  const navigate=useNavigate();
  return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articlesList.map((article) => (
        <div
          key={article._id}
          onClick={()=>{navigate(`${readOnClick?`/articles/${article._id}`:`/edit/${article._id}`}`)}}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
        >
          <img
            src={article.cover?.link}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4 flex-1 flex flex-col">
            <div className="w-fit flex items-center justify-between px-2 py-2 bg-fuchsia-400 rounded-full space-x-5">
              <div className="flex items-center justify-between space-x-0.5 !text-gray-100">
                <span className="">{article.read?.length}</span>
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <div className="flex items-center justify-between space-x-0.5 !text-gray-100">
                <span className="">{article.likes?.length}</span>
                <span className="material-symbols-outlined" style={{'--FILL':1}}>favorite</span>
              </div>
            </div>
            <h2 className="mt-2 text-lg font-bold">{article.title}</h2>
            <p className="text-sm text-gray-600 mt-1 flex-1">
              {article.summary}
            </p>
            <button className="mt-3 text-fuchsia-400 font-semibold hover:underline">
              {bottomText} →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ArticlesItem;