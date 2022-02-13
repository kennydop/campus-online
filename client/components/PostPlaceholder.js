function PostPlaceholder({type}) {
  return (
    <div className='w-screen p-1.5 md:w-102'>
      <div className='p-2 rounded-lg shadow-md bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
        <div className='py-1 text-center flex space-x-4 border-b border-gray-200 dark:border-bdark-200'>
          <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-bdark-50 animate-pulse'/>
          <div className='flex flex-col'>
            <div className='h-3 w-36 bg-gray-200 dark:bg-bdark-50 animate-pulse self-start'></div>
            <div className='h-2 w-24 mt-1 bg-gray-200 dark:bg-bdark-50 animate-pulse self-start'></div>
          </div>
        </div>
        {type === 'image' ? 
          <>
            <div className='h-4 w-64 my-4 bg-gray-200 dark:bg-bdark-50 animate-pulse self-start'></div>
            <div className='w-full h-96 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>
          </>
            :
          <>
            <div className='h-4 w-80 mt-4 bg-gray-200 dark:bg-bdark-50 animate-pulse self-start'></div>
            <div className='h-4 w-64 bg-gray-200 dark:bg-bdark-50 animate-pulse self-start'></div>
            <div className='h-4 w-24 mb-4 bg-gray-200 dark:bg-bdark-50 animate-pulse self-start'></div>

          </>
        }
        <div className='flex justify-around border-t border-gray-200 dark:border-bdark-200 pt-2'>
          <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'/>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'/>
          <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'/>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'/>
          <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'/>
        </div>
      </div>
    </div>
  )
}

export default PostPlaceholder
