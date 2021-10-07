import { PlusIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/client"
import Image from 'next/image'

function Story({name, src, blurData}) {
    const [session] = useSession();
    if(name.length > 8){
        name = name.substring(0, 8) + ' ...';
    }
    return (
        <div className='py-1 transition duration-100 transform ease-in hover:scale-102 overflow-hidden text-center cursor-pointer inline-block'>
            {src && 
            <div className='rounded-full h-15 w-15 border-2.5 border-pink-500 relative overflow-hidden'>
                <div className='rounded-full h-14 w-14 border-2 border-transparent overflow-hidden relative'>
                    <Image 
                    className='object-cover rounded-full'
                    src={src}
                    layout='fill'
                    placeholder='blur'
                    blurDataURL={blurData}
                    />
                </div>
            </div>
                }
            {!src &&
            <div className='relative h-15 w-15'> 
            <img className='object-cover rounded-full h-14 w-14'
                src={session.user.image}/>
            <div className='absolute right-0 top-0 rounded-full p-0.5 bg-pink-500 border-2 border-blue-grey-50 dark:border-bdark-200'>
                <PlusIcon className='text-blue-grey-50 w-3 h-3'/>
            </div>
            </div>
            }
            <p className='text-gray-500 dark:text-gray-400 font-light text-xs text-center'>{name}</p>
        </div>
    )
}

export default Story
