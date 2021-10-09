import { useState } from "react";

function ProfilePostsAndAbout() {
    const [tab, setTab] = useState('posts')

    return (
        <div className='md:flex-grow'>
            <div className='flex my-5 items-center justify-center space-x-3'>
                <div onClick={()=> setTab('posts')} className={`cursor-pointer ${tab === 'posts'? 'text-pink-500 border-b border-pink-500':'text-gray-500 dark:text-gray-400'}`}>Posts</div>
                <div onClick={()=> setTab('about')} className={`cursor-pointer ${tab === 'about'? 'text-pink-500 border-b border-pink-500':'text-gray-500 dark:text-gray-400'}`}>About</div>
            </div>
        </div>
    )
}

export default ProfilePostsAndAbout
