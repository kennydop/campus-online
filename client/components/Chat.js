/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import TimePast from './TimePast';

function Chat({key, img, sender, text, time, read}){
	return(
		<div className='relative flex items-center h-20 w-full border-b border-gray-300 dark:border-bdark-200 dark:hover:bg-bdark-50 hover:bg-blue-grey cursor-pointer'>
			<div className='pl-2 mr-5'>
				<img className='h-12 w-12 object-cover rounded-full text-center' src={img}/>
			</div>
			<div className='flex flex-col'>
				<p className={`self-start truncate w-44 ${read?'text-gray-500 dark:text-gray-400':'text-pink-500'}`}>{text}</p>
				<p className={`self-start text-sm font-light ${read?'text-gray-500 dark:text-gray-400':'text-pink-500'}`}>{sender}</p>
			</div>
			{/* <div className = 'absolute bottom-3 right-3'><p className={`text-xs font-light ${read ? 'text-gray-400 dark:text-gray-500' : 'text-pink-500'}`}>{time}</p></div> */}
			<TimePast date={new Date(time)} read ={read}/>
			{!read && <div className = 'absolute right-3 bg-pink-500 w-5 h-5 text-center rounded-full'><p className='text-sm text-white dark:text-gray-400'>1</p></div>}
		</div>
	)
}
export default Chat