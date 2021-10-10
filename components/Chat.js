import Header from '../components/Header'
function Chat({img, sender, time, text, read}){
	return(
		<div className='flex items-center h-20 border-b border-gray-300 dark:border-bdark-200 dark:hover:bg-bdark-50 hover:bg-blue-grey cursor-pointer'>
			<div className='pl-2 mr-5'>
				<img className='h-12 w-12 object-cover rounded-full text-center' src={img}/>
			</div>
			<div className='flex flex-col'>
				<p className={`self-start ${read?'text-gray-500 dark:text-gray-400':'text-pink-500'}`}>{sender}</p>
				<p className={`self-start text-sm font-light ${read?'text-gray-500 dark:text-gray-400':'text-pink-500'}`}>{text}</p>
			</div>
			{/* <div className = 'absolute right-3'><p className='text-xs font-light text-gray-400 dark:text-gray-500'>{time}</p></div> */}
			{!read && <div className = 'absolute right-3 bg-pink-500 w-5 h-5 text-center rounded-full'><p className='text-sm text-white dark:text-gray-400'>1</p></div>}
		</div>
	)
}
export default Chat