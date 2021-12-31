/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
import { DotsVerticalIcon } from "@heroicons/react/outline"
import { useAuth } from "../contexts/AuthContext";
import { forwardRef } from 'react';
import {HeartIcon as Filled} from '@heroicons/react/solid'
import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import TimePast from './TimePast';
import axios from 'axios';
import Link from "next/link"
import Comment from "./Comment"
import {useOnClickOutside} from "./Hooks"
import { useRouter } from 'next/router';

const Post = forwardRef(({ _post, refreshUser }, ref) => {
  const { currentUser, setRefreshPosts } = useAuth();
  const [post, setPost] = useState(_post)
  const [author, setAuthor] = useState()
  const [hasLiked, setHasLiked] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [voted, setVoted] = useState(false)
  const [pdesc, setPDesc] = useState(_post.description.slice(0, 100))
  const comRef = useRef()
  const scrollRef = useRef()
  const { theme } = useTheme()
  const moreRef = useRef();
  const router = useRouter()

  useOnClickOutside(moreRef, () =>setOpenOptions(false))

  useEffect(() => {
    if(currentUser){
      setHasLiked(post.likes?.findIndex((like)=> (like === currentUser?._id)) !== -1) //has liked
      if(post.type === "poll"){
        setVoted(post.poll.votes?.findIndex((v)=> (v === currentUser?._id)) !== -1)
      }
    }
  }, [_post, post])

  useEffect(() => {
    async function getAuthor(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+post.authorId).then((res)=>{
        setAuthor(res.data)
      })
    }
    !post.isAnonymous && getAuthor()
  }, [])

//voted?
useEffect(() => {
  if(voted){
    const choices = document.getElementById(post._id).getElementsByClassName("poll-btn")
    const chosen = post.poll.choices.find(c => c.votes.includes(currentUser._id))
    const selected = document.getElementById(chosen._id)
    selected.classList.replace("border-gray-400", "border-pink-500")
    selected.classList.replace("dark:border-gray-200", "dark:border-pink-500")
    selected.classList.replace("text-gray-500", "text-pink-500")
    selected.classList.replace("dark:text-gray-400", "dark:text-pink-500")
  
    for (let i = 0; i < choices.length; i++) {
      const e = choices[i];
      const index = post.poll.choices.findIndex(c=>c._id === e.id.valueOf())
      const fillAmount = post.poll.choices[index].votes.length/post.poll.votes.length * 100
      e.children.item(0).style.width = `${fillAmount}%`
    }
  }
},[voted === true])
//like post
  async function likePost(){
    if(currentUser){
      setHasLiked(!hasLiked)
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/like?userId=${currentUser?._id}`).then((res)=>{
        setPost(res.data)
      }).catch(()=> setHasLiked(false))
    }else{
      router.push('/login?returnUrl=/'+author._id)
    }
  }
    

//comment on a post
  async function commentOnPost(e){
    e.preventDefault();
    if(currentUser){
      if(comRef.current.value.trim() === '') return
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/comment`, {  
        authorId: currentUser?._id,
        comment: comRef.current.value
      }).then((res)=>{
        setPost(res.data)
        comRef.current.value=""
      })
    }else{
      router.push('/login?returnUrl=/'+author._id)
    }
  }

  //delete a comment
  async function deleteComment(cid){
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/comment?comment=${cid}`, { headers: { Authorization: `Bearer ${currentUser?.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>setPost(res.data))
  }

  //delete posts
  async function deletePosts(){
    setOpenOptions(false)
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}`, { headers: { Authorization: `Bearer ${currentUser?.token}`}, withCredentials: true, credentials: 'include'}).then(
      setRefreshPosts(true)
    )
  }
  
  //follow/unfollow
  function followUser(){
    setOpenOptions(false)
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${author._id}/follow`, {userId: currentUser?._id}).then((res)=>{
      if(res.data === "user has been unfollowed"){
        setRefreshPosts(true)
      }
      refreshUser()
    })
  }

  //poll voting
  function pollVote(id){
    if(voted) return;
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/vote`,{id, user: currentUser._id}).then((res)=>{
      setPost(res.data)
      setVoted(true)
    })
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView()
  },[post.comments, openComments===true])

  return (
    <div id={post._id} ref={ref} className='w-screen p-1.5 md:w-102'>
      <div className='p-2 relative rounded-lg shadow-md bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
        <div className='py-1 flex border-b border-gray-200 dark:border-bdark-200 justify-between items-center'>
          <div className="flex items-center truncate">
          {!post.isAnonymous && <Link href={`/${author?.username}`}><img className='h-9 w-9 mr-3 rounded-full object-cover cursor-pointer' src={author?.profilePicture}/></Link>}
            <div>
              {!post.isAnonymous && <div className='flex justify-center items-center space-x-2 truncate'>
                <Link href={`/${author?.username}`}><p className='text-gray-600 dark:text-gray-400 text-lg truncate cursor-pointer'>{author?.name}</p></Link>
                <Link href={`/${author?.username}`}><p className='text-gray-600 dark:text-gray-400 text-sm font-light truncate cursor-pointer'>@{author?.username}</p></Link>
              </div>}
              {post.isAnonymous && <p className='text-gray-600 dark:text-gray-400 text-lg truncate'>Anonymous</p>}
              <TimePast date={new Date(post.createdAt)}/>
            </div>
          </div>
          <div onClick={()=>setOpenOptions(true)}><DotsVerticalIcon className="h-5 text-gray-500 dark:text-gray-400 cursor-pointer"/></div>
          <div ref={moreRef} className={`absolute right-3 top-6 z-50 bg-gray-50 dark:bg-bdark-50 rounded-lg shadow-all overflow-hidden ${openOptions ? "w-40 transition-all duration-300" : "w-0 h-0 hidden"}`}>
            {(post.authorId !== currentUser?._id && !post.isAnonymous) && <div onClick={followUser} className="w-full text-center py-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-200 border-b border-gray-200 dark:border-bdark-200">{author?.followers.indexOf(currentUser?._id) > -1 ? "Unfollow" : "Follow"}</div>}
            <Link href={`/p/${post._id}`}><div className="w-full text-center py-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-200 border-b border-gray-200 dark:border-bdark-200">Go To Post</div></Link>
            {post.authorId === currentUser?._id && <div onClick={deletePosts} className="w-full text-center py-2 text-red-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-200">Delete Post</div>}
          </div>
        </div>
        {(post.type==="text"||post.type==="image" || post.type==="video") && <div className='py-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words cursor-default'>{pdesc} {post?.description.length > 100 && <p className="text-pink-500 cursor-pointer text-sm" onClick={()=>{setPDesc(pdesc.length > 100 ? post?.description.slice(0, 100) : post?.description)}}>{pdesc?.length <= 100 ? '...Read more' : ' Read Less'}</p>}</div>}
        <div>
          {((post.type==='image'|| post.type==='poll' || post.type==='product') && post.media) &&
            <div className="relative">
              <div className='unset-img'>
                <Image
                src = {post.media}
                className ='custom-img'
                layout ='fill'
                placeholder = 'blur'
                blurDataURL = {theme==='dark'? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAYAAAA53+RiAAAABHNCSVQICAgIfAhkiAAAAXRJREFUeF7t1VEJADAMxNBVTv0L3GAq8vGqICQcnd29x+UMjDC5Jh9ImGYXYaJdhBGmaiDK5ccIEzUQxbIYYaIGolgWI0zUQBTLYoSJGohiWYwwUQNRLIsRJmogimUxwkQNRLEsRpiogSiWxQgTNRDFshhhogaiWBYjTNRAFMtihIkaiGJZjDBRA1EsixEmaiCKZTHCRA1EsSxGmKiBKJbFCBM1EMWyGGGiBqJYFiNM1EAUy2KEiRqIYlmMMFEDUSyLESZqIIplMcJEDUSxLEaYqIEolsUIEzUQxbIYYaIGolgWI0zUQBTLYoSJGohiWYwwUQNRLIsRJmogimUxwkQNRLEsRpiogSiWxQgTNRDFshhhogaiWBYjTNRAFMtihIkaiGJZjDBRA1EsixEmaiCKZTHCRA1EsSxGmKiBKJbFCBM1EMWyGGGiBqJYFiNM1EAUy2KEiRqIYlmMMFEDUSyLESZqIIplMcJEDUSxLEaYqIEo1gNTr5cDklMVSwAAAABJRU5ErkJggg==' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAYAAAA53+RiAAAABHNCSVQICAgIfAhkiAAAAXZJREFUeF7t1cEJACAQxEDtv1URrEDBKuaRqyAkLDfXPnd0nIFZGK7JByqM2aUwaJfCFEY1gHL1YwqDGkCxWkxhUAMoVospDGoAxWoxhUENoFgtpjCoARSrxRQGNYBitZjCoAZQrBZTGNQAitViCoMaQLFaTGFQAyhWiykMagDFajGFQQ2gWC2mMKgBFKvFFAY1gGK1mMKgBlCsFlMY1ACK1WIKgxpAsVpMYVADKFaLKQxqAMVqMYVBDaBYLaYwqAEUq8UUBjWAYrWYwqAGUKwWUxjUAIrVYgqDGkCxWkxhUAMoVospDGoAxWoxhUENoFgtpjCoARSrxRQGNYBitZjCoAZQrBZTGNQAitViCoMaQLFaTGFQAyhWiykMagDFajGFQQ2gWC2mMKgBFKvFFAY1gGK1mMKgBlCsFlMY1ACK1WIKgxpAsVpMYVADKFaLKQxqAMVqMYVBDaBYLaYwqAEUq8UUBjWAYrWYwqAGUKwWUxjUAIr1AIxPgvK2EjJAAAAAAElFTkSuQmCC'}
                />
              </div>
              {post.type==="product" && <div className="absolute bg-gradient-to-t from-black to-transparent w-full bottom-0 text-white dark:text-gray-400 cursor-default px-3 pt-9">
                <div className="w-full flex justify-between">
                  <p className="font-semibold text-xl w-9/12 truncate">{post.product.productCondition + " " + post.product.productName}</p>
                  <p className="font-semibold text-xl truncate">GH₵{post.product.productPrice}</p>
                </div>  
                <div className='w-full'>
                  {
                    <div className='py-2 whitespace-pre-wrap break-words max-h-40 overflow-y-auto hide-scrollbar'>{pdesc} {post?.description.length > 100 && <p className="text-pink-500 cursor-pointer text-sm" onClick={()=>{setPDesc(pdesc.length > 100 ? post?.description.slice(0, 100) : post?.description)}}>{pdesc?.length <= 100 ? '...Read more' : ' Read Less'}</p>}</div>
                  }
                </div>
                <button className="clicky h-11 w-full rounded-full bg-pink-500 mb-3">Messaage Seller</button>
              </div>}
            </div>
            }
          {(post.type === 'image' && !post.media) && <div className='w-full h-96 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>}
          {post.type==="poll" && <div>
            <div className='py-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words cursor-default'>{pdesc} {post?.description.length > 100 && <p className="text-pink-500 cursor-pointer text-sm" onClick={()=>{setPDesc(pdesc.length > 100 ? post?.description.slice(0, 100) : post?.description)}}>{pdesc?.length <= 100 ? '...Read more' : ' Read Less'}</p>}</div>
            {<div>
              {
                post.poll.choices.map(c=>
                  <button disabled={voted} id={c._id} onClick={()=> pollVote(c._id)} className={`poll-btn clicky border-gray-400 dark:border-gray-200 text-gray-500 dark:text-gray-400 ${!voted && 'hover:bg-blue-grey-50 dark:hover:bg-bdark-50'}`}>
                    <div className="progress transition duration-150 ease-linear"></div>
                    <p className="z-10">{c.choice}</p>
                    {voted && <p className="absolute right-0 z-10 mr-4">{parseInt(c.votes.length/post.poll.votes.length * 100)}%</p>}
                  </button>
                )
              }
              <div className="text-gray-400 dark:text-gray-500 text-1/5xs mt-3">{post.poll.votes.length === 1 ? '1 vote' : `${post.poll.votes.length} votes`}</div>
            </div>}
          </div>}
          {(post.type==='video' && post.media) &&
            <div>
              <video controls controlsList="nodownload" className="w-full" poster={`https://res.cloudinary.com/kennydop/video/upload/${post.media}.jpg`}>
                <source src={`https://res.cloudinary.com/kennydop/video/upload/q_auto/${post.media}.webm`} type="video/webm"/>
                <source src={`https://res.cloudinary.com/kennydop/video/upload/q_auto/${post.media}.mp4`} type="video/mp4"/>
                <source src={`https://res.cloudinary.com/kennydop/video/upload/q_auto/${post.media}.ogv`} type="video/ogv"/>
              </video>
            </div>}
          {(post.type === 'video' && !post.media) && <div className='w-full h-80 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>}
        </div>
        {
          <div className={`transition duration-300 ${openComments ? 'max-h-80 bg-white dark:bg-bdark-100 mt-2' : 'h-0 max-h-0 hidden'}`}>
            {post.comments?.length !== 0 && <div className='overflow-y-auto max-h-60 hide-scrollbar border-t border-b border-gray-200 dark:border-bdark-200 py-2'>
              {
                post.comments?.map((comment)=>
                  <Comment key={comment._id} comment={comment} admin={comment.authorId === currentUser?._id} delCom={deleteComment}/>
                )
              }
              <div ref={scrollRef}></div>
            </div>}
            <div className='flex items-center justify-center w-full py-4 bg-white dark:bg-bdark-100'>
              <form className='w-11/12'>
                <input ref={comRef} type = 'text' className='pl-3 placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 rounded-full outline-none h-10 overflow-hidden w-full bg-blue-grey-50 dark:bg-bdark-200' placeholder='Write a comment' />
                <button hidden onClick={commentOnPost}></button>
              </form>
            </div>
          </div>
        }
        <div className='flex justify-around border-t border-gray-200 dark:border-bdark-200 pt-2'>
          <div onClick={likePost} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            {hasLiked?<Filled className='text-pink-500 h-6 w-6 mr-2' /> : <HeartIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />}
            {post.likes?.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-pointer'>{post.likes.length}</p>}
          </div>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
          <div onClick={()=>setOpenComments(!openComments)} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            <ChatAltIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
            {post.comments?.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-pointer'>{post.comments.length}</p>}
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
