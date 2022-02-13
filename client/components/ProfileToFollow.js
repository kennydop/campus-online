/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { db } from '../firebase/firebase';

function ProfileToFollow({name, pic, blurData}) {
    const [buttonText, setButtonText] = useState('Follow')
    const { currentUser } = useAuth();
    const [college, setCollege] = useState();

    useEffect(() => {
        var ref = db.collection("users").doc(currentUser.uid)
        ref.get().then((doc)=>{
            if(doc.exists){
                setCollege(doc.data().college);
            }
        })
    }, [])
    
    return (
        <div className='flex items-center bg-white dark:bg-bdark-100 rounded-lg shadow-md px-2 py-4 mb-2 text-gray-500 dark:text-gray-400 cursor-default w-full'>
            <div className='max-h-9 w-9 rounded-full overflow-hidden'>
                <img 
                    className='object-cover rounded-full'
                    src={pic}
                    layout=''
                    placeholder='blur'
                />
            </div>
            <div className='ml-3'>
                <p>{name}</p>
                <p className='text-xs font-light w-11/12 truncate'>{college}</p>
            </div>
            <div className={`py-1 px-1.5 absolute right-6 mb-5 dark:text-gray-200 rounded-full shadow-md dark:shadow-lg hover:shadow-lg dark:hover:shadow-xl cursor-pointer text-xs ${buttonText==='Follow'?'bg-pink-500 text-white':'bg-blue-grey-50 dark:bg-bdark-50'}`} onClick={()=>{buttonText === 'Follow'?setButtonText('Following'):setButtonText('Follow')}}>{buttonText}</div>
        </div>
    )
}

export default ProfileToFollow
