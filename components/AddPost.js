import { useSession } from "next-auth/client"
import {CameraIcon, VideoCameraIcon, CalendarIcon} from "@heroicons/react/outline"
const sendPost =(e)=>{
    e.preventDefault();
}

function AddPost() {
    const [session] = useSession()
    return (
        <div className='p-2 rounded-lg shadow-md text-gray-500 font-medium bg-white'>
            <div className='flex space-x-4 items-center mb-3 ml-2'>
                <img className='rounded-full object-cover h-12 w-12' src={session.user.image}/>
                <form className='flex flex-1'>
                    <input className='outline-none bg-blue-grey-50 placeholder-gray-500 rounded-full focus:ring-1 focus:ring-gray-500 w-60 h-10 p-3' 
                        type='text'
                        placeholder={`What's up, ${session.user.name}?`}/>
                    <button className='hidden'onClick={sendPost} type='submit'/>
                </form>
            </div>
            <div className='flex justify-evenly p-3 border-t'>
                <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <VideoCameraIcon className='text-red-500 h-6'/>
                    <p className='text-xs'>Live</p>
                </div>
                <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <CameraIcon className='text-blue-500 h-6'/>
                    <p className='text-xs'>Photo/Video</p>
                </div>
                <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <CalendarIcon className='text-green-500 h-6'/>
                    <p className='text-xs'>Event</p>
                </div>
            </div>
        </div>
    )
}

export default AddPost
