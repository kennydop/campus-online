import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
// import {HeartIcon} from '@heroicons/react/solid'

function Post({key, name, email, timestamp, image, message, postImage, postType }) {
    return (
        <div className='w-screen p-1.5 md:w-102'>
            <div className='p-2 rounded-lg shadow-md bg-white flex flex-grow flex-col'>
                <div className='my-2 text-center flex space-x-4'>
                    <img className='h-10 w-10 rounded-full' src={image}/>
                    <div className='flex flex-col'>
                        <p className='mb-1 text-gray-600 self-start'>{name}</p>
                        <p className='text-xs font-light text-gray-500 self-start'>{new Date(timestamp?.toDate()).toLocaleString()}</p>
                    </div>
                </div>
                <div className='mb-2'><p className='text-gray-600'>{message}</p></div>
                <div>
                    {postType==='image' && 
                    <div className='relative h-105'>
                        <Image
                        src = {postImage}
                        objectFit='cover'
                        layout='fill'
                        />
                    </div>}
                    {postType==='video' &&
                    <div>
                        <video controls>
                            <source src={postImage}/>
                        </video>
                    </div> }
                </div>
                <div className='flex justify-around mt-2'>
                    <div className='flex flex-grow justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100'>
                        <HeartIcon className='text-gray-500 h-6 w-6 mr-2' />
                        <p className='text-gray-500'>Like</p>
                    </div>
                    <div className='flex flex-grow justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100'>
                        <ChatAltIcon className='text-gray-500 h-6 w-6 mr-2' />
                        <p className='text-gray-500'>Comment</p>
                    </div>
                    <div className='flex flex-grow justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100'>
                        <ShareIcon className='text-gray-500 h-6 w-6 mr-2' />
                        <p className='text-gray-500'>Share</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
