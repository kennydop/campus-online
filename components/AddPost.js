import { useSession } from "next-auth/client"
import {CameraIcon, VideoCameraIcon, CalendarIcon} from "@heroicons/react/outline"
import { useRef, useState } from "react";
import {PaperAirplaneIcon, XIcon} from '@heroicons/react/solid'
import { db, firebaseApp} from '../firebase/firebase'
function AddPost() {

    const [session] = useSession();
    const postRef = useRef(null);
    const imgRef = useRef(null);
    const [imgPreview, setImagePreview] = useState()
    
    const sendPost =(e)=>{
        e.preventDefault();

        if(!postRef.current.value) return;

        db.collection('posts').add({
            message: postRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
        });
        postRef.current.value='';
        
    }

    const setSelectedImgPreview = () => {

    }
    return (
        <div className='p-2 rounded-lg shadow-md text-gray-500 font-medium bg-white flex flex-grow flex-col'>
            <div className='flex space-x-4 items-center mb-3 ml-2'>
                <img className='rounded-full object-cover h-12 w-12' src={session.user.image}/>
                <form className='flex flex-1'>
                    <input className='outline-none bg-blue-grey-50 placeholder-gray-500 rounded-full focus:ring-1 focus:ring-gray-500 h-10 p-2 resize-none overflow-hidden' 
                        ref={postRef}
                        type='text'
                        placeholder={`What's up, ${session.user.name}?`}/>
                </form>
                <div onClick={sendPost} className='p-2 cursor-pointer rounded-lg items-center justify-center flex-grow'>
                    <PaperAirplaneIcon className='hover:text-blue-grey-50 text-pink-500 rotate-90 h-7'/>
                </div>
            </div>
            <div className='transition duration-100 transform ease-in hover:scale-110 relative'>
            {imgPreview && (
                <div className='absolute right-0 top-0 rounded-full p-1 bg-pink-500 transition duration-100 transform ease-in hover:scale-110'>
                <XIcon className='text-blue-grey-50 w-3.5 h-3.5'/>
                </div>
                )}
                <img className = 'w-20 hover:'/>
            </div>
            <div className='flex justify-evenly p-3 border-t'>
                <div className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <VideoCameraIcon className='text-red-500 h-6'/>
                    <p className='text-xs'>Live</p>
                </div>
                <div onClick={imgRef.current.click()} className='flex items-center space-x-1 hover:bg-gray-100 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <CameraIcon className='text-blue-500 h-6'/>
                    <p className='text-xs'>Photo/Video</p>
                    <input className='hidden'
                        ref={imgRef}
                        onChange={setSelectedImgPreview}
                        type='file' 
                        />
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
