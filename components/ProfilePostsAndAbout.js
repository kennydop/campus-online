import { useState } from "react";
import MyPosts from "./MyPosts";
import About from "./About";
function ProfilePostsAndAbout() {
    const [tab, setTab] = useState('posts')
    
    return (
        <div>
            <div className={`flex my-5 items-center justify-center space-x-3 z-50 top-14`}>
                <div onClick={()=> setTab('posts')} className={`cursor-pointer ${tab === 'posts'? 'text-pink-500 border-b border-pink-500':'text-gray-500 dark:text-gray-400'}`}>Posts</div>
                <div onClick={()=> setTab('about')} className={`cursor-pointer ${tab === 'about'? 'text-pink-500 border-b border-pink-500':'text-gray-500 dark:text-gray-400'}`}>About</div>
            </div>
            <div className='flex flex-col mx-auto justify-center items-center w-full'>
                {/* {tab === 'posts' ? <MyPosts/> : <About/>} */}
                <div className='h-105 w-96 mx-auto bg-white mb-4'></div>
                <div className='h-105 w-96 mx-auto bg-white mb-4'></div>
                <div className='h-105 w-96 mx-auto bg-white mb-4'></div>
            </div>
            <div className='pt-20'></div>
        </div>
    )
}

export default ProfilePostsAndAbout
