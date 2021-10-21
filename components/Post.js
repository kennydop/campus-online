/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
import { db, firebaseApp} from '../firebase/firebase'
import { useAuth } from "../contexts/AuthContext";
import { forwardRef } from 'react';
import {HeartIcon as Filled} from '@heroicons/react/solid'
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import TimePast from './TimePast';
import Comment from './Comment';

const Post = forwardRef(({key, id, name, email, timestamp, image, message, postImage, postType }, ref) => {
    const { currentUser } = useAuth();
    const [hasLiked, setHasLiked] = useState(false)
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const [openComments, setOpenComments] = useState(false)
    const comRef = useRef()
    const { theme } = useTheme()
    
    // liking
    
    useEffect(() => {
        const postRef = db.collection('posts').doc(id)
        postRef.collection("likes").onSnapshot((querySnapshot) => {
            setLikes(querySnapshot.docs)
        });
    }, [])
    
    useEffect(() => {
        setHasLiked(likes?.findIndex((like)=> (like.id === currentUser.uid)) !== -1)
    }, [likes])

    async function likePost(){
        const postRef = db.collection('posts').doc(id)
        if (hasLiked){
            postRef.collection('likes').doc(currentUser.uid).delete()
            setHasLiked(false)
        }else{
            postRef.collection('likes').doc(currentUser.uid).set({username: currentUser.displayName})
            setHasLiked(true)
        }
    }
    // commenting

    useEffect(() => {
        const postRef = db.collection('posts').doc(id)
        postRef.collection("comments").orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
            setComments(querySnapshot.docs)
        });
    }, [])


    async function commentOnPost(e){
        e.preventDefault();
        if(comRef.current.value.trim() !== ''){
            const postRef = db.collection('posts').doc(id)
            await postRef.collection('comments').add({username: currentUser.displayName, comment: comRef.current.value, image: currentUser.photoURL, timestamp: firebaseApp.firestore.FieldValue.serverTimestamp()}).then(
                comRef.current.value = ''
            )
        }
        
    }

    return (
        <div ref={ref} className='w-screen p-1.5 md:w-102'>
            <div className='p-2 rounded-lg shadow-md bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
                <div className='py-1 text-center flex space-x-4 border-b border-gray-200 dark:border-bdark-200'>
                    <img className='h-10 w-10 rounded-full object-cover' src={image}/>
                    <div className='flex flex-col'>
                        <p className='text-gray-600 dark:text-gray-400 self-start'>{name}</p>
                        {timestamp && <TimePast date={new Date(timestamp?.toDate())}/>}
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
                {
                    <div className={`transition duration-300 ${openComments ? 'max-h-80 bg-blue-grey-50 dark:bg-bdark-200 mt-2' : 'h-0 max-h-0 hidden'}`}>
                        <div className='overflow-y-auto max-h-60 hide-scrollbar border border-blue-grey-50 dark:border-bdark-200'>
                            {
                                comments?.map((comment)=>
                                    (<Comment key={comment.id} username={comment.data().username} image={comment.data().image} comment={comment.data().comment} timestamp={comment.data().timestamp} />)
                                )
                            }
                        </div>
                        <div className='flex items-center justify-center w-full py-4 bg-white dark:bg-bdark-100 border-t border-gray-200 dark:border-bdark-200'>
                            <form className='w-11/12'>
                                <input ref={comRef} type = 'text' className='pl-3 placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 rounded-full focus:ring-1 focus:ring-gray-500 h-10 overflow-hidden w-full bg-blue-grey-50 dark:bg-bdark-200' placeholder='Write a comment' />
                                <button hidden onClick={commentOnPost}></button>
                            </form>
                        </div>
                    </div>
                }
                <div className='flex justify-around border-t border-gray-200 dark:border-bdark-200 pt-2'>
                    <div onClick={likePost} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        {hasLiked?<Filled className='text-pink-500 h-6 w-6 mr-2' /> : <HeartIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />}
                        {likes.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-default'>{likes.length}</p>}
                    </div>
                    <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
                    <div onClick={()=>setOpenComments(!openComments)} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <ChatAltIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                        {comments.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-default'>{comments.length}</p>}
                    </div>
                    <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
                    <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
                        <ShareIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Post
