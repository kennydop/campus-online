import { SiteLayout } from "../../Layouts/Layouts"
import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
import { DotsVerticalIcon } from "@heroicons/react/outline"
import {HeartIcon as Filled} from '@heroicons/react/solid'
import { useState, useEffect, useRef } from 'react';
import TimePast from '../../components/TimePast';
import axios from 'axios';
import Link from "next/link"
import { useRouter } from 'next/router';
import { useAuth } from "../../contexts/AuthContext"
import {useOnClickOutside} from "../../components/Hooks"
import { useTheme } from 'next-themes';
import {NotFound} from "../404"
import { useActiveTab } from "../../contexts/ActiveTabContext"
import Comment from "../../components/Comment"

function PostPage({_post}) {
  const [post, setPost] = useState(_post)
  const [author, setAuthor] = useState()
  const [hasLiked, setHasLiked] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const router = useRouter();
  const { currentUser } = useAuth();
  const comRef = useRef()
  const moreRef = useRef();
  const { theme } = useTheme()
	const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()

  useOnClickOutside(moreRef, () =>setOpenOptions(false))

  useEffect(()=>{
    if(tabActive==='postpage')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('postpage');
},[])

  useEffect(() => {
    !post.isAnonymous && axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+post.authorId).then((res)=>{
      setAuthor(res.data)
    })
  }, [])

  useEffect(() => {
    if(currentUser){
      setHasLiked(post.likes?.findIndex((like)=> (like === currentUser._id)) !== -1) //has liked
    }
  }, [post])

//like post
  async function likePost(){
    if(currentUser){
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/like?userId=${currentUser._id}`).then((res)=>{
        setPost(res.data)
        setHasLiked(true)
      })
    }else{
      router.push('/login?returnUrl=/p/'+post._id)
    }
  }
    

//comment on a post
  async function commentOnPost(e){
    e.preventDefault();
    if(currentUser){
      if(comRef.current.value.trim() === '') return
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/comment`, {  
        authorId: currentUser._id,
        comment: comRef.current.value
      }).then((res)=>{
        setPost(res.data)
        comRef.current.value=""
      })
    }else{
      router.push('/login?returnUrl=/p/'+post._id)
    }
  }

  //delete a comment
  async function deleteComment(cid){
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/comment?comment=${cid}`, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>setPost(res.data))
  }

  //delete posts
  async function deletePosts(){
    setOpenOptions(false)
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}`, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then(
      router.push('/')
    )
  }
  
  //follow/unfollow
  function followUser(){
    setOpenOptions(false)
    if(currentUser){
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${author._id}/follow`, {userId: currentUser._id})
    }else{
      router.push('/login?returnUrl=/p/'+post._id)
    }
  }

  return (
    post ?
      <>
    <div className="flex mx-auto w-full justify-center minus-header mt-4 mb-16">
		<div className="'w-screen p-1.5 md:w-102">
      <div className='p-2 relative rounded-lg bg-white dark:bg-bdark-100 flex flex-grow flex-col'>
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
            {post.authorId !== currentUser?._id && <div onClick={followUser} className="w-full text-center py-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-200 border-b border-gray-200 dark:border-bdark-200">{author?.followers.indexOf(currentUser?._id) > -1 ? "Unfollow" : "Follow"}</div>}
            {post.authorId === currentUser?._id && <div onClick={deletePosts} className="w-full text-center py-2 text-red-500 cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-200">Delete Post</div>}
          </div>
        </div>
        <div className='py-2 text-gray-600 dark:text-gray-400 whitespace-pre-wrap cursor-default'>{post.description}</div>
        <div>
          {(post.type==='image'&& post.media) &&
            <div className='unset-img relative'>
              <Image
              src = {post.media}
              className ='custom-img'
              layout ='fill'
              placeholder = 'blur'
              blurDataURL = {theme==='dark'? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAYAAAA53+RiAAAABHNCSVQICAgIfAhkiAAAAXRJREFUeF7t1VEJADAMxNBVTv0L3GAq8vGqICQcnd29x+UMjDC5Jh9ImGYXYaJdhBGmaiDK5ccIEzUQxbIYYaIGolgWI0zUQBTLYoSJGohiWYwwUQNRLIsRJmogimUxwkQNRLEsRpiogSiWxQgTNRDFshhhogaiWBYjTNRAFMtihIkaiGJZjDBRA1EsixEmaiCKZTHCRA1EsSxGmKiBKJbFCBM1EMWyGGGiBqJYFiNM1EAUy2KEiRqIYlmMMFEDUSyLESZqIIplMcJEDUSxLEaYqIEolsUIEzUQxbIYYaIGolgWI0zUQBTLYoSJGohiWYwwUQNRLIsRJmogimUxwkQNRLEsRpiogSiWxQgTNRDFshhhogaiWBYjTNRAFMtihIkaiGJZjDBRA1EsixEmaiCKZTHCRA1EsSxGmKiBKJbFCBM1EMWyGGGiBqJYFiNM1EAUy2KEiRqIYlmMMFEDUSyLESZqIIplMcJEDUSxLEaYqIEo1gNTr5cDklMVSwAAAABJRU5ErkJggg==' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAABmCAYAAAA53+RiAAAABHNCSVQICAgIfAhkiAAAAXZJREFUeF7t1cEJACAQxEDtv1URrEDBKuaRqyAkLDfXPnd0nIFZGK7JByqM2aUwaJfCFEY1gHL1YwqDGkCxWkxhUAMoVospDGoAxWoxhUENoFgtpjCoARSrxRQGNYBitZjCoAZQrBZTGNQAitViCoMaQLFaTGFQAyhWiykMagDFajGFQQ2gWC2mMKgBFKvFFAY1gGK1mMKgBlCsFlMY1ACK1WIKgxpAsVpMYVADKFaLKQxqAMVqMYVBDaBYLaYwqAEUq8UUBjWAYrWYwqAGUKwWUxjUAIrVYgqDGkCxWkxhUAMoVospDGoAxWoxhUENoFgtpjCoARSrxRQGNYBitZjCoAZQrBZTGNQAitViCoMaQLFaTGFQAyhWiykMagDFajGFQQ2gWC2mMKgBFKvFFAY1gGK1mMKgBlCsFlMY1ACK1WIKgxpAsVpMYVADKFaLKQxqAMVqMYVBDaBYLaYwqAEUq8UUBjWAYrWYwqAGUKwWUxjUAIr1AIxPgvK2EjJAAAAAAElFTkSuQmCC'}
              />
            </div>}
          {(post.type === 'image' && !post.media) && <div className='w-full h-96 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>}
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
            {post.comments.length !== 0 && <div className='overflow-y-auto max-h-60 hide-scrollbar border-t border-b border-gray-200 dark:border-bdark-200 py-2'>
              {
                post.comments?.map((comment)=>
                  <Comment key={comment._id} comment={comment} admin={comment.authorId === currentUser?._id} delCom={deleteComment}/>
                )
              }
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
            {post.likes.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-pointer'>{post.likes.length}</p>}
          </div>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
          <div onClick={()=>setOpenComments(!openComments)} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            <ChatAltIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
            {post.comments.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-pointer'>{post.comments.length}</p>}
          </div>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
          <div className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            <ShareIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className='pt-20'></div>
    </>
    :
    <NotFound/>
  )
}

PostPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
        {page}
    </SiteLayout>
  )
}

export async function getServerSideProps(context) {
  const _post = await (await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/" + context.query.post)).data
  return {
    props: {
      _post,
    },
  }
}

export default PostPage
