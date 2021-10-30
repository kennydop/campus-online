import { HomeIcon, LocationMarkerIcon, HeartIcon, CakeIcon, TemplateIcon, ArchiveIcon } from '@heroicons/react/solid'
function About() {
    return (
        <div className='md:mx-auto w-full md:w-10/12 bg-white dark:bg-bdark-100 shadow-md rounded-lg cursor-default'>
            <div className='text-gray-500 dark:text-gray-400 py-3 pl-4 border-b dark:border-bdark-50'>About</div>
            <div className='grid md:grid-cols-2 grid-cols-1 p-6'>
                <div className='flex items-center justify-start mb-2 pl-4 h-12 space-x-3 hover:bg-gray-100 dark:hover:bg-bdark-50 rounded-lg'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
                        <CakeIcon className='h-7 text-yellow-500'/>
                    </div>
                    <div className='text-gray-500 dark:text-gray-400'>Born on 2nd may</div>
                </div>
                <div className='flex items-center justify-start mb-2 pl-4 h-12 space-x-3 hover:bg-gray-100 dark:hover:bg-bdark-50 rounded-lg'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
                        <HomeIcon className='h-7 text-blue-500'/>
                    </div>
                    <div className='text-gray-500 dark:text-gray-400'>Lives in Anum</div>
                </div>
                <div className='flex items-center justify-start mb-2 pl-4 h-12 space-x-3 hover:bg-gray-100 dark:hover:bg-bdark-50 rounded-lg'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
                        <LocationMarkerIcon className='h-7 text-green-500'/>
                    </div>
                    <div className='text-gray-500 dark:text-gray-400'>From Anum</div>
                </div>
                <div className='flex items-center justify-start mb-2 pl-4 h-12 space-x-3 hover:bg-gray-100 dark:hover:bg-bdark-50 rounded-lg'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
                        <HeartIcon className='h-7 text-red-500'/>
                    </div>
                    <div className='text-gray-500 dark:text-gray-400'>Single</div>
                </div>
                <div className='flex items-center justify-start mb-2 pl-4 h-12 space-x-3 hover:bg-gray-100 dark:hover:bg-bdark-50 rounded-lg'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
                        <TemplateIcon className='h-7 text-purple-500'/>
                    </div>
                    <div className='text-gray-500 dark:text-gray-400'>3 Posts</div>
                </div>
                <div className='flex items-center justify-start mb-2 pl-4 h-12 space-x-3 hover:bg-gray-100 dark:hover:bg-bdark-50 rounded-lg'>
                    <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
                        <ArchiveIcon className='h-7 text-pink-400'/>
                    </div>
                    <div className='text-gray-500 dark:text-gray-400'>Other</div>
                </div>
            </div>
        </div>
    )
}

export default About
