/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {CameraIcon, VideoCameraIcon, CalendarIcon} from "@heroicons/react/outline"
import { useRef, useState } from "react";
import { XCircleIcon } from '@heroicons/react/solid'
import { db, firebaseApp, storage} from '../firebase/firebase'
import { useAuth } from "../contexts/AuthContext";

function AddPost() {
    const { currentUser } = useAuth();
    const postRef = useRef(null);
    const imgRef = useRef(null);
    const [imgToPost, setImgToPost] = useState()
    const [vidToPost, setVidToPost] = useState()
    const [error, setError] = useState()
    const [posting, setPosting] = useState()

    const sendPost =(e)=>{
        e.preventDefault();
        if(postRef.current.value.trim()==='') return;
        setPosting(true)

        if(imgToPost) {
            db.collection('posts').add({
                message: postRef.current.value,
                name: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
                author: currentUser.uid,
                postType: "image",
                timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
            }).then((doc) => {
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imgToPost , 'data_url');
                setImgToPost(null);
                uploadTask.on("state_change", null, (error) => setError(error.message),
                ()=> {
                // when the upload completes
                    storage.ref('posts').child(doc.id).getDownloadURL().then(url => {
                        db.collection('posts').doc(doc.id).set({postImage: url}, {merge: true })
                    }).then(
                    setPosting(false))
                })
            })
        }else if(vidToPost){
            db.collection('posts').add({
                message: postRef.current.value,
                name: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
                author: currentUser.uid,
                postType: "video",
                timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
            }).then((doc) => {
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(vidToPost, 'data_url');
                setVidToPost(null);
                uploadTask.on("state_change", null, (error) => setError(error.message),
                ()=> {
            // when the upload completes
                storage.ref('posts').child(doc.id).getDownloadURL().then(url => {
                    db.collection('posts').doc(doc.id).set({postImage: url}, {merge: true })
                }).then(
                setPosting(false))
            })
        })
        }else{
            db.collection('posts').add({
                message: postRef.current.value,
                name: currentUser.displayName,
                email: currentUser.email,
                image: currentUser.photoURL,
                author: currentUser.uid,
                timestamp: firebaseApp.firestore.FieldValue.serverTimestamp(),
            })
            setPosting(false)
        }
        postRef.current.value='';
        setError('')                    
    }

    const setSelectedImgPreview = (e) => {
    setError('');
    const reader = new FileReader();
    if(e.target.files[0]){
        if (e.target.files[0].type.substr(0, 5) === "image") {
        setVidToPost(null)
            reader.readAsDataURL(e.target.files[0]);
        reader.onload = (readerEvent) => {
            setImgToPost(readerEvent.target.result);
            }
        }
        else if(e.target.files[0] && e.target.files[0].type.substr(0, 5) === "video"){
            setImgToPost(null)
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);   
            reader.onload = (e) => {
                setVidToPost(e.target.result)
            }
        }
        else {
            setError('File not supported!');
            setImgToPost(null)
            setVidToPost(null)
            setPosting(false)
        }
    }
    }
    return (
        <div className='w-screen p-1.5 md:w-105'>
        <div className='p-2 rounded-lg shadow-md text-gray-500 font-medium bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
            <div className='flex space-x-4 items-center mb-3 ml-2'>
                <img className='rounded-full object-cover h-11 w-11' src={currentUser.photoURL}/>
                <form className='flex flex-1'>
                    <input className='outline-none bg-blue-grey-50 dark:bg-bdark-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 rounded-full focus:ring-1 focus:ring-gray-500 h-10 p-2 overflow-hidden w-full' 
                        ref={postRef}
                        type='text'
                        placeholder={`What's up, ${currentUser.displayName}?`}/>
                    <button hidden onClick={sendPost}></button>
                </form>
            </div>
            {error && <p className='errorMsg'>{error}</p>}
            {posting && <p className='text-gray-500 text-sm self-center font-light mb-2'>...posting...</p>}
            {imgToPost && (
                <div className='relative my-2 self-center'>
                    <img className = 'w-80 object-contain' src={imgToPost} alt=''/>
                    <XCircleIcon onClick={()=>setImgToPost(null)} className='absolute h-6 w-6 -right-3 -top-3 bg-white rounded-full text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
                </div>
                )}
            {vidToPost && (
                <div className='relative my-2 self-center'>
                    <video className = 'w-80 object-contain' controls>
                        <source src={vidToPost}/> 
                    </video>
                    <XCircleIcon onClick={()=>setVidToPost(null)} className='absolute h-6 w-6 -right-3 -top-3 bg-white rounded-full text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
                </div>
                )}
            <div className='flex justify-evenly p-3 border-t dark:border-bdark-200'>
                <div className='flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-bdark-50 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <VideoCameraIcon className='text-red-500 h-6'/>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Live</p>
                </div>
                <div onClick={()=>imgRef.current.click()} className='flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-bdark-50 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <CameraIcon className='text-blue-500 h-6'/>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Photo/Video</p>
                    <input
                        ref={imgRef}
                        onChange={setSelectedImgPreview}
                        type='file' 
                        hidden
                        />
                </div>
                <div className='flex items-center space-x-1 hover:bg-gray-100 dark:hover:bg-bdark-50 flex-grow justify-center p-2 cursor-pointer rounded-lg'>
                    <CalendarIcon className='text-green-500 h-6'/>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>Event</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AddPost