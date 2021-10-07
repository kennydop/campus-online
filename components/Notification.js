function Notification({text, read}) {
    return (
        <div className='h-20 flex'>
            <div className={`h-full w-1 ${read?'bg-gray-400':'bg-pink-500'}`}></div>
            <div className={`overflow-hidden  h-20 flex items-center justify-center border-b border-gray-300 dark:border-bdark-50 p-2 ${read?'bg-blue-grey-50 dark:bg-bdark-200':''}`}>
                <p className='text-gray-500 dark:text-gray-400'>{text}</p>
            </div>
        </div>
    )
}

export default Notification
