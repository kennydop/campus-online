/* eslint-disable jsx-a11y/alt-text */
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { db } from '../firebase/firebase';

function ProfileToFollow({name, pic, blurData}) {
    const [buttonText, setButtonText] = useState('Follow')
    const { currentUser } = useAuth();
    const [college, setCollege] = useState();

    useEffect(() => {
        console.log("made a request for user's college from Profile to follow")
        var ref = db.collection("users").doc(currentUser.uid)
        ref.get().then((doc)=>{
            setCollege(doc.data().college);
        })
    }, [])
    
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
                <p className='text-xs font-light w-full truncate'>{college}</p>
            </div>
            <div className={`p-1 absolute right-6 mb-5 dark:text-gray-200 rounded-lg shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-xs ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={()=>{buttonText === 'Follow'?setButtonText('Following'):setButtonText('Follow')}}>{buttonText}</div>
        </div>
    )
}

export default ProfileToFollow
