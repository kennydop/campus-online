import { PhotographIcon, XIcon, TagIcon, ChartBarIcon, ArrowLeftIcon, PlusIcon } from "@heroicons/react/outline"
import { useActiveTab } from "../contexts/ActiveTabContext"
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

function PostDialog() {
  const { currentUser, setRefreshPosts } = useAuth()
  const { prevTab, prevPrevTab, setPrevTab, setTabActive, tabActive } = useActiveTab()
  const postRef = useRef(null);
  const mediaRef = useRef(null);
  const close = useRef(null);
  const [mediaToPost, setMediaToPost] = useState()
  const [productImg, setProductImg] = useState()
  const [type, setType] = useState("text")
  const [error, setError] = useState()
  const [posting, setPosting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)

  useEffect(()=>{
    if(tabActive === "post media"){
      mediaRef.current.click()
      setTabActive("post")
    }else if(tabActive === "post poll"){
      document.getElementById("_poll").click()
      setTabActive("post")
    }else if(tabActive === "post product"){
      document.getElementById("_product").click()
      setTabActive("post")
    }
  },[])

  useEffect(()=>{
    var textarea = document.getElementById("_p");
    if(textarea){
      textarea.oninput = function() {
        textarea.style.height = ""; /* Reset the height*/
        textarea.style.height = textarea.scrollHeight + "px";
      }
    }
  },[document.getElementById("_p")])

  const setSelectedImgPreview = (e) => {
    setError('');
    if(e.target.files[0].size > 80000000){
      setError("File is too big")
      return
    }
    if((e.target.id === "post_media" && e.target.files[0].type.substr(0, 5) === "video") || (e.target.files[0].type.substr(0, 5) === "image")){
      const reader = new FileReader();
      setLoading(true)
      // console.log(reader.readAsDataURL(e.target.files[0]))
      reader.readAsDataURL(e.target.files[0]); 
      if(e.target.id === "post_media" && e.target.files[0].type.substr(0, 5) === "video"){
        setType("video")
      }else if(e.target.id === "post_media" && e.target.files[0].type.substr(0, 5) === "image"){
        setType("image")
      }
      reader.onloadend = (r) => {
        e.target.id === "post_media" && setMediaToPost(r.target.result)
        e.target.id === "pdt_img" && setProductImg(r.target.result)
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
        isAnonymous: isAnonymous,
      }).then(()=>{
        setPosting(false)
        setRefreshPosts(true)
        close.current.click()
      }).catch((error)=>{
        setError(error)
        close.current.click()
      })
  }

  return (
    <div id="qw" className="flex flex-col w-screen apfl md:apfc md:w-100 centered bg-white dark:bg-bdark-100 md:rounded-lg shadow-md z-50 overflow-y-auto overflow-x-hidden">
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
      {(type==='video'||type==='image'||type==='text') && <div className="p-3">
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
              <video id="_vid" className = 'w-full object-contain rounded-lg' controlsList='nodownload' controls>
                <source src={mediaToPost}/> 
              </video>
              <XIcon onClick={()=>{setMediaToPost(null); setType("text")}} className='absolute h-6 w-6 right-0 top-3 text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
            </div>}
            </>
          )}
        </div>
        }
      </div>}
      {(type==='product') && <div className="p-3">
        <div className="w-full h-11 text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <div onClick={()=>setType("text")}><ArrowLeftIcon className="h-6 w-6 cursor-pointer"/></div>
          <p>Create A Product</p>
        </div>
        {error && <p className='my-2 errorMsg'>{error}</p>}
        {!productImg ?
          <div onClick={()=>document.getElementById("pdt_img").click()} className="cursor-pointer w-full mb-3 rounded-lg h-44 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
              <PlusIcon className="h-8 w-8"/>
              <p>Add Product Image</p>
              <input id="pdt_img" hidden type="file" accept="image/*" onChange={setSelectedImgPreview}/>
            </div>
          </div>
          :
          !loading ?
          <div className="w-full mb-3 rounded-lg">
            <img className = 'w-full object-contain rounded-lg' src={productImg} alt='product to post'/>
          </div>
          :
          <div className="loader-bg animate-spin mx-auto my-6"></div>
        }
      </div>}
      {(type==='poll') && <div className="p-3">
        <div className="w-full h-11 text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <div onClick={()=>setType("text")}><ArrowLeftIcon className="h-6 w-6 cursor-pointer"/></div>
          <p>Create A Poll</p>
        </div>
      </div>}
      <div className="flex p-3 justify-between pt-5 border-t dark:border-bdark-200 items-center">
        <div className="flex space-x-3">
          <div onClick={()=>mediaRef.current.click()}>
            <PhotographIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
            <input id="post_media" ref={mediaRef} onChange={setSelectedImgPreview} type='file'  hidden />
          </div>
          <div id="_product" onClick={()=>setType("product")}>
            <TagIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
          </div>
          <div id="_poll" onClick={()=>setType("poll")}>
            <ChartBarIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
          </div>
        </div>
        <div className="flex space-x-2 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Anonymous</p>
          <input type="checkbox" checked={isAnonymous} onChange={()=>setIsAnonymous(!isAnonymous)} />
        </div>
        <div>
          <button disabled={posting} className='h-7 w-16 rounded-full shadow-md text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl bg-pink-500 text-white dark:text-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-400' onClick={sendPost}>Post</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PostDialog
