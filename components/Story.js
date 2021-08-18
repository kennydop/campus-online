import { PlusIcon } from "@heroicons/react/outline"

function Story({name, src}) {
    return (
        <div className='overflow-hidden text-center mx-5 cursor-pointer'>
            {src && <img 
            className='object-cover rounded-full z-50 top-10 h-14 w-14 border-2 border-pink-500'
            src={src}
            />}
            {!src && 
            <div className='bg-gray-100 rounded-full p-2 top-10 z-50'>
            <PlusIcon className='text-gray-500'/>
            </div>}
            <p className='text-gray-500 font-light text-xs text-center'>{name}</p>
        </div>
    )
}

export default Story
