import Image from 'next/image'
import { useState } from 'react'

function ProfileToFollow({name, pic, blurData}) {
    const [followState, setFollowState] = useState()
    const [buttonText, setButtonText] = useState('Follow')
    return (
        <div className='flex items-center border-b dark:border-bdark-200 px-2 py-4 text-gray-500 dark:text-gray-400 cursor-default'>
            <div className='h-14 w-14 rounded-full overflow-hidden relative'>
                <Image 
                    className='object-cover rounded-full'
                    src={pic}
                    layout='fill'
                    placeholder='blur'
                    blurDataURL={blurData}
                />
            </div>
            <div className='ml-3'>
                <p>{name}</p>
                <p className='text-xs font-light'>University of Cape Coast</p>
            </div>
            <div className={`p-0.5 absolute right-6 dark:text-gray-200 rounded-md shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-sm ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={()=>{buttonText === 'Follow'?setButtonText('Following'):setButtonText('Follow')}}>{buttonText}</div>
        </div>
    )
}

export default ProfileToFollow
