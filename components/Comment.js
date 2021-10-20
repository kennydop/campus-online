/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import TimePast from "./TimePast"

function Comment({key, username, image, comment, timestamp}) {
    return (
        <div className='fit-content flex flex-col items-start p-2 my-2 ml-6 rounded-lg shadow-md bg-white dark:bg-bdark-100 cursor-default'>
            <div className='flex items-center justify-center'>
                <img src={image} className='h-6 w-6 rounded-full object-cover mr-2'/>
                <p className='text-sm mr-2 text-gray-600 dark:text-gray-400 self-start'>{username}</p>
                {timestamp && <TimePast date={new Date(timestamp?.toDate())}/>}
            </div>
            <p className='text-gray-600 dark:text-gray-400 self-start'>{comment}</p>
        </div>
    )
}

export default Comment
