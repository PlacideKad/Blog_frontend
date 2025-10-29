const Loader=({message_,style_})=>{
	return(
		<div className={`${style_} flex items-center justify-center`}>
			<div className="flex flex-row items-center justify-center px-10 space-x-3">
				<div className="w-10 h-10 border-gray-300 border-6 rounded-full border-t-purple-600 animate-spin"></div>
				<p
				className="text-gray-600 text-sm font-medium">{message_}</p>
			</div>
		</div>
	);
}
export default Loader;