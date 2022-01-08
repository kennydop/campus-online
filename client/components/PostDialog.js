import { PhotographIcon, XIcon, TagIcon, ChartBarIcon, ArrowLeftIcon, PlusIcon, PencilIcon } from "@heroicons/react/outline"
import { useActiveTab } from "../contexts/ActiveTabContext"
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";

function PostDialog() {
  const { currentUser } = useAuth()
  const { setTabActive, tabActive } = useActiveTab()
  const postRef = useRef(null);
  const [mediaToPost, setMediaToPost] = useState()
  const [productImg, setProductImg] = useState()
  const [pollImg, setPollImg] = useState()
  const [type, setType] = useState("text")
  const [error, setError] = useState()
  const [pollError, setPollError] = useState()
  const [productError, setProductError] = useState()
  const [posting, setPosting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const { socket } = useSocket()

  useEffect(()=>{
    if(tabActive[tabActive.length-1] === "post media"){
      document.getElementById("post_media").click()
      setTabActive("post", true)
    }else if(tabActive[tabActive.length-1] === "post poll"){
      document.getElementById("_poll").click()
      setTabActive("post", true)
    }else if(tabActive[tabActive.length-1] === "post product"){
      document.getElementById("_product").click()
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
    setProductError('');
    setPollError('');
    if(e.target.files[0]?.size > 80000000){
      type === "poll" ? setPollError("File is too big") : (type === "product" ? setProductError("File is too big") : setError("File is too big"))
      return
    }
    if((e.target.id === "post_media" && e.target.files[0].type?.substr(0, 5) === "video") || (e.target.files[0].type?.substr(0, 5) === "image")){
      const reader = new FileReader();
      setLoading(true)
      reader.readAsDataURL(e.target.files[0]); 
      if(e.target.id === "post_media" && e.target.files[0].type.substr(0, 5) === "video"){
        setType("video")
      }else if(e.target.id === "post_media" && e.target.files[0].type.substr(0, 5) === "image"){
        setType("image")
      }
      reader.onloadend = (r) => {
        e.target.id === "post_media" && setMediaToPost(r.target.result)
        e.target.id === "pdt_img" && setProductImg(r.target.result)
        e.target.id === "poll_img" && setPollImg(r.target.result)
        setLoading(false)
      }
    }else {
      type === "poll" ? setPollError("File not supported!") : (type === "product" ? setProductError("File not supported!") : setError("File not supported!"))
      setMediaToPost(null)
      setLoading(false)
      setPosting(false)
    }
  }


  const sendPost =(e)=>{
    setError('');
    setProductError('');
    setPollError('');
    e.preventDefault();
    const _rtiv = type === "text" || type === "image" || type === "video"
    const _riv = type === "image" && mediaToPost || type === "video" && mediaToPost

    const {product_name, product_condition, product_price, product_desc} = type === "product" && document.getElementById("post-product").elements
    const {poll_desc, poll_duration_p, poll_duration_s} =  type === "poll" && document.getElementById("post-poll").elements
    const poll_choices = []
    
    if(type === "poll"){
      const choices = document.getElementsByClassName("_c")
			for (let i = 0; i < choices.length; i++) {
				const c = {
					choice: choices.item(i).value.trim()
				}
				poll_choices.push(c)
			}
		}

    if(_rtiv){
      if(postRef.current.value.trim()==='' && !mediaToPost){
        setError("Enter something to post")
        return
      }
    }else if(type === "product"){
      if(product_name.value.trim() === ""){
        setProductError("Enter the name of your item")
        return
      }else if(product_condition.value.trim() === "" || product_condition.value.toLowerCase().trim() === "condition*"){
        setProductError("Is the item new or used or refurbished?")
        return
      }else if(product_price.value.trim() === ""){
        setProductError("You haven't entered a price yet")
        return
      }else if(product_price.value.trim() === ""){
        setProductError("You haven't entered a price yet")
        return
      }else if(!productImg){
        setProductError("Add an image for your item")
        return
      }
    }else if(type === "poll"){
      if(poll_desc.value.trim() === ""){
        setPollError("What's your poll about? please enter a description")
        return
      }else if(poll_choices.length !== 0){
				for (let i = 0; i < poll_choices.length; i++) {
					const e = poll_choices[i];
					if(e === ""){
						setPollError(`Choice ${i + 1} has been left empty`)
						return
					}
				}
			}else{
				setPollError("Enter choices for your poll")
				return
			}
    }
    const post = {
      authorId: currentUser._id,
      type: type,
      description: type === "product" ? product_desc.value.trim() : (type === "poll" ? poll_desc.value.trim() : postRef.current.value.trim()),
      media: type === "product" ? productImg : (type === "poll" ? pollImg : (_riv && mediaToPost)),
      college: currentUser.college,
      isAnonymous: type !== "product" && isAnonymous,
      poll: type === "poll" && {
        exp: (poll_duration_p.value + ' ' + poll_duration_s.value),
        choices: poll_choices,
      },
      product: type === "product" && {
        productName: product_name.value.trim(),
        productPrice: Math.abs(product_price.value).toFixed(2),
        productCondition: product_condition.value.trim()
      }
    }

    setPosting(true)
    axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts", post).then(()=>{
      setPosting(false)
      socket.emit('sendPost', {
        id: currentUser._id,
        college: currentUser.college
      })
      document.getElementById("close_post").click()
    }).catch((error)=>{
      type === "poll" ? setPollError(error) : (type === "product" ? setProductError(error) : setError(error))        
      document.getElementById("close_post").click()
    })
  }

  function createChoiceFields(e){
    const choices = [];
    const length = e.target.value
    for (let i = 0;  i< length; i++) {
      var choice = document.createElement("div")
      choice.innerHTML = 
        `<div class="flex mb-8">
            <div class="poll-choice">
              Choice ${i + 1}*
            </div>
            <input
            required=true
            type="text"
            title="price of product"
            class="infofield-edit pl-26 _c"
            />
        </div>`
      choices.push(choice)
    }
    document.getElementById("choices").replaceChildren(...choices)
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
        <div id="close_post" onClick={()=>{setTabActive(tabActive[tabActive.length-2]==='notification' ? tabActive[tabActive.length-3] : "go back")}}>
          <XIcon className="h-6 w-6 cursor-pointer"/>
        </div>
      </div>
      {(type==='video'||type==='image'||type==='text') && <div className="p-3">
        {error && <p className='longer-errorMsg'>{error}</p>}
        <div className="flex">
          <img className='rounded-full object-cover h-11 w-11' src={currentUser.profilePicture}/>
          <textarea id='_p' ref={postRef} name="post message" className="ml-3 no-ta-resize outline-none w-full bg-transparent text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500" placeholder="What's up?"/>
        </div>
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
        {productError && <p className='my-2 longer-errorMsg'>{productError}</p>}
        {!productImg ?
          <div onClick={()=>document.getElementById("pdt_img").click()} className="cursor-pointer w-full mb-3 rounded-lg h-44 bg-blue-grey-50 dark:bg-bdark-200 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
              <PlusIcon className="h-8 w-8"/>
              <p>Add Product Image*</p>
            </div>
          </div>
          :
          !loading ?
          <div className="w-full mb-3 rounded-lg overflow-hidden relative">
            <img className = 'w-full object-contain rounded-lg' src={productImg} alt='product to post'/>
            <XIcon onClick={()=>{setProductImg(null)}} className='absolute h-6 w-6 right-0 top-0 text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
            <div onClick={()=>document.getElementById("pdt_img").click()} className='absolute right-0 bottom-0 py-1 px-3 bg-gray-500 dark:bg-bdark-200 bg-opacity-70 cursor-pointer'><PencilIcon className='h-4 text-white dark:text-gray-400'/></div>
          </div>
          :
          <div className="loader-bg animate-spin mx-auto my-6"></div>
        }
        <input id="pdt_img" hidden type="file" accept="image/*" onChange={setSelectedImgPreview}/>
        <form id="post-product" className="flex flex-col mt-8">
          <div className="flex mb-8">
            <input
            id="product_name"
            type="text"
            title="ad title"
            className="infofield-edit"
            placeholder="Name*"
            required={true}
            />
          </div>
          <div className="flex mb-8">
            <select id="product_condition" className="infofield-edit" placeholder="Condition*" required={true}>
              <option disabled selected hidden>Condition*</option>
              <option>New</option>
              <option>Refurbished</option>
              <option>Used</option>
            </select>
          </div>
          <div className="flex mb-8">
            <div>
              <div className="rounded-l-full absolute h-11 px-2.5 bg-white dark:bg-bdark-100 border border-blue-grey-50 dark:border-bdark-200 flex items-center justify-center text-gray-400 dark:text-gray-500">
                GH₵
              </div>
              <input
              id="product_price"
              type="number"
              title="price of product"
              className="infofield-edit pl-16"
              placeholder="Price*"
              required={true}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <textarea id="product_desc" placeholder="Description" className="h-40 p-3 rounded-lg outline-none no-ta-resize bg-blue-grey-50 dark:bg-bdark-200 text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 ring-pink-500"/>
          </div>
        </form>
      </div>}
      {(type==='poll') && <div className="p-3">
        <div className="w-full h-11 text-gray-500 dark:text-gray-400 flex items-center justify-between">
          <div onClick={()=>setType("text")}><ArrowLeftIcon className="h-6 w-6 cursor-pointer"/></div>
          <p>Create A Poll</p>
        </div>
        <div>
          {pollError && <p className='my-2 longer-errorMsg'>{pollError}</p>}
          {!pollImg ?
          <div onClick={()=>document.getElementById("poll_img").click()} className="cursor-pointer w-full rounded-lg h-12 bg-blue-grey-50 dark:bg-bdark-200 flex items-center justify-center">
            <div className="text-gray-500 dark:text-gray-400 flex flex-col items-center justify-center">
              <p>Add Image</p>
            </div>
          </div>
          :
          !loading ?
          <div className="w-full rounded-lg overflow-hidden relative">
            <img className = 'w-full object-contain rounded-lg' src={pollImg} alt='product to post'/>
            <XIcon onClick={()=>{setPollImg(null)}} className='absolute h-6 w-6 right-0 top-0 text-red-500 transition duration-75 transform ease-in hover:scale-110 cursor-pointer'/>
            <div onClick={()=>document.getElementById("poll_img").click()} className='absolute right-0 bottom-0 py-1 px-3 bg-gray-500 dark:bg-bdark-200 bg-opacity-70 cursor-pointer'><PencilIcon className='h-4 text-white dark:text-gray-400'/></div>
          </div>
          :
          <div className="loader-bg animate-spin mx-auto my-6"></div>
        }
          <input id="poll_img" hidden type="file" accept="image/*" onChange={setSelectedImgPreview}/>
          <form id="post-poll" className="flex flex-col">
            <div className="flex flex-col my-4">
              <textarea id="poll_desc" placeholder="Question" className="h-36 p-3 rounded-lg outline-none no-ta-resize bg-blue-grey-50 dark:bg-bdark-200 text-gray-500 dark:text-gray-400 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-1 ring-pink-500"/>
            </div>
            <div className="flex">
              <select id="poll_choices" className="infofield-edit" placeholder="Condition*" required={true} onChange={createChoiceFields}>
                <option disabled selected hidden>Number of Choices*</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </div>
            <div id="choices" className="my-4">
            </div>
            <div>
              <p className="text-gray-400 dark:text-gray-500">Poll Length*</p>
              <div className="grid grid-cols-2">
                <select id="poll_duration_p" className="outline-none bg-blue-grey-50 dark:bg-bdark-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 rounded-full focus:ring-1 focus:ring-pink-500 px-2 h-11" placeholder="Condition*" required={true}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
                <select id="poll_duration_s" className="outline-none bg-blue-grey-50 dark:bg-bdark-200 placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 rounded-full focus:ring-1 focus:ring-pink-500 px-2 h-11" placeholder="Condition*" required={true}>
                  <option>minute(s)</option>
                  <option>hour(s)</option>
                  <option>day(s)</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>}
      <div className="flex p-3 justify-between pt-5 border-t dark:border-bdark-200 items-center">
        <div className="flex space-x-3">
          <div onClick={()=>{type === "text" || type === "image" || type === "video" ? document.getElementById("post_media").click() : setType(mediaToPost ? mediaToPost.startsWith("data:video") ? 'video' : 'image' : 'text')}}>
            <PhotographIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
            <input id="post_media" onChange={setSelectedImgPreview} type='file'  hidden />
          </div>
          <div id="_product" onClick={()=>setType("product")}>
            <TagIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
          </div>
          <div id="_poll" onClick={()=>setType("poll")}>
            <ChartBarIcon className="h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400"/>
          </div>
        </div>
        {type !== "product" &&<div className="flex space-x-2 items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">Anonymous</p>
          <input type="checkbox" checked={isAnonymous} onChange={()=>setIsAnonymous(!isAnonymous)} />
        </div>}
        <div>
          <button disabled={posting} className='h-7 w-16 rounded-full shadow-md text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl bg-pink-500 text-white dark:text-gray-200 disabled:bg-gray-300 dark:disabled:bg-gray-400' onClick={sendPost}>Post</button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default PostDialog
