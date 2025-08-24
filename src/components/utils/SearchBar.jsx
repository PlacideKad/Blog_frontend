const SearchBar=()=>{
  const handleResearch=()=>{
    console.log('hello');
  }

  return(
    <form 
    className="w-full h-10 md:w-1/2 lg:w-1/3 my-4 items-center justify-center flex"
    action={handleResearch}>
      <div className="w-full h-full ring-fuchsia-400 ring-2 rounded-full flex items-center justify-evenly">
        <input
        className="w-8/10 h-full rounded-l-full outline-none px-4" 
        name="search-input"
        type="text" 
        placeholder="Entrer un nom ou une adresse mail"  />
        <button className="w-2/10 h-full cursor-pointer flex items-center justify-center rounded-r-full bg-fuchsia-400">
          <span className="material-symbols-outlined !text-white !text-[2rem]">
            search
          </span>
        </button>
      </div>
    </form>
  );
}
export default SearchBar