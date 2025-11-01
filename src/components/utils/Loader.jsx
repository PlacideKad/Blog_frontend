const Loader=({message_,style_,h_="h-10",w_="w-10",border_="border-6"})=>{
	return(
		<div className={`${style_} flex items-center justify-center`}>
			<div className="flex flex-row items-center justify-center px-10 space-x-3">
				<div className={`${h_} ${w_} border-gray-300 ${border_} rounded-full border-t-purple-600 animate-spin`}></div>
				<p
				className="text-gray-600 text-sm font-medium">{message_}</p>
			</div>
		</div>
	);
}
export default Loader;