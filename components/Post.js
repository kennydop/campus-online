/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
import { db, firebaseApp} from '../firebase/firebase'
import { useAuth } from "../contexts/AuthContext";
import { forwardRef } from 'react';
import {HeartIcon as Filled} from '@heroicons/react/solid'
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

const Post = forwardRef(({key, id, name, email, timestamp, image, message, postImage, postType }, ref) => {
    const { currentUser } = useAuth();
    const [hasLiked, setHasLiked] = useState(false)
    const [likes, setLikes] = useState([])
    const { theme } = useTheme()
    
    useEffect(() => {
        console.log('made a request for hasLiked from post')
        const postRef = db.collection('posts').doc(id)
        postRef.collection('likes').doc(currentUser.uid).get().then((doc)=>{
            if (doc.exists){
                setHasLiked(true);
            }
        })
    }, [])

    useEffect(() => {
        console.log('made a request for likes from post')
        const postRef = db.collection('posts').doc(id)
        postRef.collection("likes").get().then((querySnapshot) => {
            setLikes(querySnapshot.docs)
        });
    }, [hasLiked])

    async function likePost(){
        const postRef = db.collection('posts').doc(id)
        if (hasLiked){
            console.log('made a request to like a post')
            postRef.collection('likes').doc(currentUser.uid).delete()
            setHasLiked(false)
        }else{
            postRef.collection('likes').doc(currentUser.uid).set({username: currentUser.displayName})
            setHasLiked(true)
        }
    }

    return (
        <div ref={ref} className='w-screen p-1.5 md:w-102'>
            <div className='p-2 rounded-lg shadow-md bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
                <div className='py-1 text-center flex space-x-4 border-b border-gray-200 dark:border-bdark-200'>
                    <img className='h-10 w-10 rounded-full' src={image}/>
                    <div className='flex flex-col'>
                        <p className='mb-1 text-gray-600 dark:text-gray-400 self-start'>{name}</p>
                        {timestamp && <p className='text-xs font-light text-gray-500 self-start'>{new Date(timestamp?.toDate()).toLocaleString()}</p>}
                    </div>
                </div>
                <div className='py-2'><p className='text-gray-600 dark:text-gray-400'>{message}</p></div>
                <div>
                    {
                        (postType==='image'&& postImage) &&
                            <div className='unset-img relative'>
                                <Image
                                src = {postImage}
                                className ='custom-img'
                                layout ='fill'
                                placeholder = 'blur'
                                blurDataURL = {theme==='dark'? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAYAAAA53+RiAAAABHNCSVQICAgIfAhkiAAAAXRJREFUeF7t1VEJADAMxNBVTv0L3GAq8vGqICQcnd29x+UMjDC5Jh9ImGYXYaJdhBGmaiDK5ccIEzUQxbIYYaIGolgWI0zUQBTLYoSJGohiWYwwUQNRLIsRJmogimUxwkQNRLEsRpiogSiWxQgTNRDFshhhogaiWBYjTNRAFMtihIkaiGJZjDBRA1EsixEmaiCKZTHCRA1EsSxGmKiBKJbFCBM1EMWyGGGiBqJYFiNM1EAUy2KEiRqIYlmMMFEDUSyLESZqIIplMcJEDUSxLEaYqIEolsUIEzUQxbIYYaIGolgWI0zUQBTLYoSJGohiWYwwUQNRLIsRJmogimUxwkQNRLEsRpiogSiWxQgTNRDFshhhogaiWBYjTNRAFMtihIkaiGJZjDBRA1EsixEmaiCKZTHCRA1EsSxGmKiBKJbFCBM1EMWyGGGiBqJYFiNM1EAUy2KEiRqIYlmMMFEDUSyLESZqIIplMcJEDUSxLEaYqIEo1gNTr5cDklMVSwAAAABJRU5ErkJggg==' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAYAAAA53+RiAAAABHNCSVQICAgIfAhkiAAAAXZJREFUeF7t1cEJACAQxEDtv1URrEDBKuaRqyAkLDfXPnd0nIFZGK7JByqM2aUwaJfCFEY1gHL1YwqDGkCxWkxhUAMoVospDGoAxWoxhUENoFgtpjCoARSrxRQGNYBitZjCoAZQrBZTGNQAitViCoMaQLFaTGFQAyhWiykMagDFajGFQQ2gWC2mMKgBFKvFFAY1gGK1mMKgBlCsFlMY1ACK1WIKgxpAsVpMYVADKFaLKQxqAMVqMYVBDaBYLaYwqAEUq8UUBjWAYrWYwqAGUKwWUxjUAIrVYgqDGkCxWkxhUAMoVospDGoAxWoxhUENoFgtpjCoARSrxRQGNYBitZjCoAZQrBZTGNQAitViCoMaQLFaTGFQAyhWiykMagDFajGFQQ2gWC2mMKgBFKvFFAY1gGK1mMKgBlCsFlMY1ACK1WIKgxpAsVpMYVADKFaLKQxqAMVqMYVBDaBYLaYwqAEUq8UUBjWAYrWYwqAGUKwWUxjUAIr1AIxPgvK2EjJAAAAAAElFTkSuQmCC'}
                                />
                            </div>
                    }
                    {(postType === 'image' && !postImage) && <div className='w-full h-96 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>}
                    {(postType==='video' && postImage) &&
                        <div>
                            <video controls>
                                <source src={postImage}/>
                            </video>
                        </div> 
                    }
                    {(postType === 'video' && !postImage) && <div className='w-full h-80 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>}

                </div>
                <div className='flex justify-around border-t border-gray-200 dark:border-bdark-200 pt-2'>
                    <div onClick={likePost} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        {hasLiked?<Filled className='text-pink-500 h-6 w-6 mr-2' /> : <HeartIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />}
                        {likes.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-default'>{likes.length}</p>}
                    </div>
                    <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
                    <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <ChatAltIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                        <p className='text-gray-500 dark:text-gray-400 cursor-default'></p>
                    </div>
                    <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
                    <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <ShareIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                        <p className='text-gray-500 dark:text-gray-400'></p>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Post
