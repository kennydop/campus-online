import Image from "next/image"
import {signOut, useSession} from "next-auth/client";
import {CameraIcon, PencilIcon} from "@heroicons/react/outline"
import { useState } from 'react';

function ProfileCard() {
    const [session] = useSession()
    const [tab, setTab] = useState('posts')
    return (
        <div className='flex flex-col items-center overflow-y-auto'>
            <div className='w-screen md:w-102 md:pt-10'>
                <div className='relative w-full bg-white md:rounded-t-lg h-40'>
                    <img src="data:image/jpeg;base64,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" 
                    className='w-full h-full object-cover overflow-hidden md:rounded-t-lg'/>
                    <div className='absolute right-0 bottom-0 py-1 px-3 bg-gray-500 bg-opacity-70 cursor-pointer'><CameraIcon className='h-4 text-white'/></div>
                </div>
                <div className='relative w-full bg-white rounded-b-lg h-48 flex flex-col'>
                    <div className='absolute -top-10 left-1/2 -ml-10'>
                        <div className='relative'>
                            <img className = "h-20 w-20 object-cover rounded-full cursor-pointer" src = {session.user.image}/>
                            <div className='absolute right-0 bottom-0 py-2 px-2 bg-gray-500 bg-opacity-90 rounded-full cursor-pointer transition hover:scale-105'><CameraIcon className='h-3 text-white'/></div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full'>
                            <div className = 'flex flex-col w-1/2 cursor-pointer mt-2'>
                                <div><p className = 'text-center text-gray-500 mr-12 text-lg font-medium'>5.4k</p></div>
                                <div><p className = 'text-center text-gray-500 mr-12 text-xs font-light'>followers</p></div>
                            </div>
                            <div className = 'flex flex-col w-1/2 cursor-pointer mt-2'>
                                <div><p className = 'text-center text-gray-500 ml-12 text-lg font-medium'>1</p></div>
                                <div><p className = 'text-center text-gray-500 ml-12 text-xs font-light'>following</p></div>
                            </div>
                        </div>
                        <div className = 'flex w-full h-5 items-center mt-4'>
                            <div className='w-1/2'><p className = 'text-right mr-4 text-gray-500 text-md font-medium'>{session.user.name}</p></div>
                            <div className='h-4 border-l border-gray-500'></div>
                            <div className='w-1/2'><p className = 'text-left ml-4 text-gray-500 text-md font-medium'>UCC🎓</p></div>
                        </div>
                    </div>
                    <div className='items-center justify-center px-20 mt-4'>
                        <p className='text-center text-gray-500 text-sm font-light'>I'm GOD 😈👽😌</p>
                    </div>
                    <div className='self-center absolute bottom-2'>
                        <div className='p-2 bg-gray-500 items-center justify-center text-white text-sm flex rounded-lg cursor-pointer'><PencilIcon className='h-5 text-white text-center mr-2'/>Edit Profile</div>
                    </div>
                </div>
            </div>
            <div className='flex mt-5 pb-2 self-center space-x-3'>
                <div onClick={()=> setTab('posts')} className={`w-1/2 text-right mr-3 cursor-pointer ${tab === 'posts'? 'text-pink-500 border-b border-pink-500':'text-gray-500'}`}>Posts</div>
                <div onClick={()=> setTab('about')} className={`w-1/2 text-left ml-3 cursor-pointer ${tab === 'about'? 'text-pink-500 border-b border-pink-500':'text-gray-500'}`}>About</div>
            </div>
        </div>
    )
}

export default ProfileCard
