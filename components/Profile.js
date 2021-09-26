import Image from "next/image"
import {signOut, useSession} from "next-auth/client";
import {CameraIcon, PencilIcon} from "@heroicons/react/outline"


function Profile() {
    const [session] = useSession()
    return (
        <div className='h-screen w-screen flex flex-col items-center z-50 overflow-y-auto'>
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
                            <div className='absolute right-0 bottom-0 py-2 px-2 bg-gray-500 bg-opacity-90 rounded-full cursor-pointer transition hover:scale-125'><CameraIcon className='h-3 text-white'/></div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex w-full'>
                            <div className = 'flex flex-col w-1/2'>
                                <div><p className = 'text-center text-gray-500 mr-12 text-lg font-medium'>5.4k</p></div>
                                <div><p className = 'text-center text-gray-500 mr-12 text-xs font-light'>followers</p></div>
                            </div>
                            <div className = 'flex flex-col w-1/2'>
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
            <div className='flex mt-5 pb-2 border-gray-500 w-full md:w-102'>
                <div className='w-1/2 text-right mr-3 text-pink-500'>Posts(100)</div>
                <div className='w-1/2 text-left ml-3 text-gray-500'>About</div>
            </div>
        </div>
    )
}

export default Profile
