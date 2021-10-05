import Header from '../components/Header'
function Chat({img, sender, time, text, read}){
	return(
		<div className='flex items-center h-20 border-b border-gray-300 hover:bg-blue-grey cursor-pointer'>
			<div className='pl-2 mr-5'>
				<img className='h-12 w-12 object-cover rounded-full text-center'/>
			</div>
			<div className='flex flex-col'>
				<p className={`self-start ${read?'text-gray-500':'text-pink-500'}`}>{sender}</p>
				<p className={`self-start ${read?'text-gray-500':'text-pink-500'}`}>{text}</p>
			</div>
			<p className='text-xs font-light text-gray-400 absolute right-3'>{time}</p>

		</div>
	)
}
export default Chat