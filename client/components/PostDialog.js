import { PhotographIcon, XIcon, TagIcon, ChartBarIcon } from "@heroicons/react/outline"
import { useActiveTab } from "../contexts/ActiveTabContext"
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function PostDialog() {
  const { currentUser } = useAuth()
  const { prevTab, prevPrevTab, setTabActive } = useActiveTab()
  const postRef = useRef(null);
  const mediaRef = useRef(null);
  const vidRef = useRef(null);
  const close = useRef(null);
  const [mediaToPost, setMediaToPost] = useState()
  const [type, setType] = useState("text")
  const [error, setError] = useState()
  const [posting, setPosting] = useState(false)
  const [loading, setLoading] = useState(false)

  const setSelectedImgPreview = (e) => {
    setError('');
    if(e.target.files[0].size > 80000000){
      setError("File is too big")
      return
    }
    if(e.target.files[0].type.substr(0, 5) === "video" || e.target.files[0].type.substr(0, 5) === "image"){
      const reader = new FileReader();
      setLoading(true)
      reader.readAsDataURL(e.target.files[0]); 
      if(e.target.files[0].type.substr(0, 5) === "video"){
        setType("video")
      }else if(e.target.files[0].type.substr(0, 5) === "image"){
        setType("image")
      }
      reader.onloadend = (e) => {
        setMediaToPost(e.target.result)
        setLoading(false)
      }
    }else {
      setError('File not supported!');
      setMediaToPost(null)
      setType("text")
      setLoading(false)
      setPosting(false)
    }
  }

  const sendPost =(e)=>{
    setError("")
    e.preventDefault();
    if(postRef.current.value.trim()==='' && !mediaToPost){
      setError("Enter something to post")
      return
    } 
      
    setPosting(true)
    axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts", 
      {
        authorId: currentUser._id,
        type: type,
        description: postRef.current.value,
        media: mediaToPost && mediaToPost,
        college: currentUser.college,
        authorName: currentUser.name,
        authorUsername: currentUser.username,
        authorImg: currentUser.profilePicture
      }).then(()=>{
        setPosting(false)
        close.current.click()
      }).catch((error)=>{
        setError(error)
        close.current.click()
      })
  }
  useEffect(()=>{
    var textarea = document.getElementById("_p");
    textarea.oninput = function() {
      textarea.style.height = ""; /* Reset the height*/
      textarea.style.height = textarea.scrollHeight + "px";
    }
  })

  return (
    <div id="qw" className="flex flex-col w-screen apfl md:apfc md:w-100 centered bg-white dark:bg-bdark-100 md:rounded-lg shadow-md z-50 overflow-y-auto">
      <div className="relative">
      {posting && 
      <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-50">
        <div className="loader-bg animate-spin mx-auto z-50"/>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-20"/>
      </div>}
      <div className="p-3 md:p-2 border-b dark:border-bdark-200 text-gray-500 dark:text-gray-400 flex justify-between">
        <p className="font-semibold">Create A Post</p>
        <div ref={close} onClick={()=>{setTabActive(prevTab==='settings' || prevTab==='notification' ? prevPrevTab : prevTab)}}>
          <XIcon className="h-6 w-6 cursor-pointer"/>
        </div>
      </div>
      <div className="p-3">
        <div className="flex">
          <img className='rounded-full object-cover h-11 w-11' src={currentUser.profilePicture}/>
          <textarea id='_p' ref={postRef} name="post message" className="ml-3 no-ta-resize outline-none w-full bg-transparent text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500" placeholder="What's up?"/>
        </div>
        {error && <p className='errorMsg'>{error}</p>}
        {loading ?
        <div className="loader-bg animate-spin mx-auto my-6"></div>
        :
        <div>
          {mediaToPost && (
            <>
            {type === "image" &&
            <div className='relative my-6 self-center border-t dark:border-bdark-200'>
              <p className="my-3 text-gray-500 dark:text-gray-400">Image</p>
              <img className = 'w-full object-contain rounded-lg' src={mediaToPost} alt='image to post'/>
              <XIcon onClick={()=>{setMediaToPost(null); setType("text")}} className='absolute h-6 w-6 right-0 top-3 text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
            </div>}
            {type === "video" &&
            <div className='relative my-6 self-center border-t dark:border-bdark-200'>
              <p className="my-3 text-gray-500 dark:text-gray-400">Video</p>
              <video id="_vid" ref={vidRef} className = 'w-full object-contain rounded-lg' controlsList='nodownload' controls>
                <source src={mediaToPost}/> 
              </video>
              <XIcon onClick={()=>{setMediaToPost(null); setType("text")}} className='absolute h-6 w-6 right-0 top-3 text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
            </div>}
            </>
          )}
        </div>
        }
      </div>
      <div className="flex p-3 justify-between pt-5 border-t dark:border-bdark-200 items-center">
        <div className="flex space-x-3">
          <div onClick={()=>mediaRef.current.click()}>
            <PhotographIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
            <input ref={mediaRef} onChange={setSelectedImgPreview} type='file'  hidden />
          </div>
          <div>
            <TagIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
          </div>
            <ChartBarIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
        </div>
        <button disabled={posting}className='h-7 w-16 rounded-full shadow-md text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl bg-pink-500 text-white dark:text-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-400' onClick={sendPost}>Post</button>
      </div>
      </div>
    </div>
  )
}

export default PostDialog
