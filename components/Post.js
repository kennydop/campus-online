import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
import { db, firebaseApp} from '../firebase/firebase'
import {useUser} from '../firebase/useUser'

// import {HeartIcon} from '@heroicons/react/solid'

function Post({key, id, name, email, timestamp, image, message, likes, comments, postImage, postType }) {
    const {user} = useUser();
    var pliked = []
    let colRef = db.collection('posts').doc(id)
    colRef.get().then((doc)=> {
        pliked = doc.data().liked;
    })
    const likePicture = () => {
        if(pliked !== undefined){  
            for (let i = 0; i < pliked.length; i++) {
                const element = pliked[i];
                if(element === user.id){
                    colRef.set({likes: firebaseApp.firestore.FieldValue.increment(-1)}, {merge: true})
                    colRef.update({liked: firebaseApp.firestore.FieldValue.arrayRemove(user.id)}) 
                    return;
                }
            }
            colRef.set({likes: firebaseApp.firestore.FieldValue.increment(1)}, {merge: true})
            colRef.update({liked: firebaseApp.firestore.FieldValue.arrayUnion(user.id)}) 
        }
        else{
            colRef.set({likes: firebaseApp.firestore.FieldValue.increment(1)}, {merge: true})
            colRef.update({liked: firebaseApp.firestore.FieldValue.arrayUnion(user.id)}) 
        }
    }

    return (
        <div className='w-screen p-1.5 md:w-102'>
            <div className='p-2 rounded-lg shadow-md bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
                <div className='py-1 text-center flex space-x-4 border-b border-gray-200 dark:border-bdark-200'>
                    <img className='h-10 w-10 rounded-full' src={image}/>
                    <div className='flex flex-col'>
                        <p className='mb-1 text-gray-600 dark:text-gray-400 self-start'>{name}</p>
                        <p className='text-xs font-light text-gray-500 self-start'>{new Date(timestamp?.toDate()).toLocaleString()}</p>
                    </div>
                </div>
                <div className='py-2'><p className='text-gray-600 dark:text-gray-400'>{message}</p></div>
                <div>
                    {postType==='image' && 
                    <div className='relative mb-2 h-100'>
                        <Image
                        src = {postImage}
                        objectFit='cover'
                        layout='fill'
                        placeholder = 'blur'
                        blurDataURL={`/_next/image?url=${postImage}&w=16&q=1`}
                        />
                    </div>}
                    {postType==='video' &&
                    <div className = 'mb-2'>
                        <video controls>
                            <source src={postImage}/>
                        </video>
                    </div> }
                </div>
                <div className='flex justify-around border-t border-gray-200 dark:border-bdark-200 pt-2'>
                    <div onClick={likePicture} className='flex flex-grow justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <HeartIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                        <p className='text-gray-500 dark:text-gray-400'>{likes}</p>
                    </div>
                    <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
                    <div className='flex flex-grow justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <ChatAltIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                        <p className='text-gray-500 dark:text-gray-400'>{comments}</p>
                    </div>
                    <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
                    <div className='flex flex-grow justify-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <ShareIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                        <p className='text-gray-500 dark:text-gray-400'></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
