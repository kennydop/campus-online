import { PlusIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import Image from 'next/image'

function Story({name, src, blurData}) {
    const [session] = useSession();
    return (
        <div className='transition duration-200 transform ease-in hover:scale-110 overflow-hidden text-center z-50 top-10 mx-5 cursor-pointer inline-block'>
            {src && 
            <div className='rounded-full h-14 w-14 border-2 border-pink-500 overflow-hidden relative'>
                <Image 
                className='object-cover rounded-full hover:blur-xl'
                src={src}
                layout='fill'
                placeholder='blur'
                blurDataURL={blurData}
                />
            </div>
                }
            {!src &&
            <div className='relative'> 
            <img className='object-cover rounded-full h-14 w-14'
                src={session.user.image}/>
            <div className='absolute right-0 top-0 rounded-full p-0.5 bg-pink-500'>
                <PlusIcon className='text-blue-grey-50 w-3 h-3'/>
            </div>
            </div>
            }
            <p className='text-gray-500 font-light text-xs text-center'>{name}</p>
        </div>
    )
}

export default Story
