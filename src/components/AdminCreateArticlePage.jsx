const AdminCreateArticlePage=()=>{
  return(
    <div className="min-h-full w-full pt-8">

      {/* nota */}
      <section className="text-neutral-400 text-[.8rem]">
        Les champs marqués de ( <span className="text-red-500">*</span> ) sont obligatoires.
      </section>

      {/* formulaire */}
      <form action=""
      className="w-full min-h-full flex flex-col items-center justify-start space-y-4 mt-2">

        {/* titre */}
        <div className="w-full flex items-center justify-evenly">
          <label 
          className="w-2/10"
          htmlFor="title">Titre <span className="text-[.8rem] text-red-500">*</span>
          </label>
          <input 
          type="text" 
          id="title"
          className="w-7/10 ring-fuchsia-500 ring-2 rounded-md outline-none px-4 py-1 focus:ring-4 transition-all ease duration-200"
          placeholder="" />
        </div>

        {/* Sous-titre */}
        <div className="w-full flex items-center justify-evenly">
          <label 
          className="w-3/10"
          htmlFor="sub-title">Sous-titre <span className="text-[.8rem] text-red-500">*</span>
          </label>
          <div className="w-6/10 h-20">
            <textarea 
            name="sub-title" 
            className="w-full h-full ring-fuchsia-500 ring-2 rounded-md outline-none px-3 py-0 focus:ring-4 focus:py-1 transition-all ease duration-200"
            id="sub-title"
            placeholder="">
            </textarea>
          </div>
        </div>
        {/* pieces jointes */}
        <div>

        </div>

        {/* Article content */}
        <div 
        className="flex flex-col w-full min-h-[70vh] px-4">
          <label 
          className="font-extrabold text-xl"
          htmlFor="content">Article <span className="text-[.8rem] text-red-500">*</span></label>
          <textarea 
          name="content" 
          id="content" 
          className="w-full h-[69vh] outline-none border-t-2 pt-4 border-fuchsia-500"
          placeholder="Redigez votre article ici"></textarea>
        </div>
        <button 
        className="bg-linear-to-r from-fuchsia-400 to-purple-400 text-gray-50 px-8 py-2 rounded-lg shadow-md"
        type="submit">Publier</button>
      </form>
    </div>
  )
}
export default AdminCreateArticlePage;