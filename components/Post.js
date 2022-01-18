/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/display-name */
import Image from 'next/image'
import {HeartIcon, ChatAltIcon, ShareIcon} from '@heroicons/react/outline'
import { DotsVerticalIcon } from "@heroicons/react/outline"
import { useAuth } from "../contexts/AuthContext";
import {HeartIcon as Filled} from '@heroicons/react/solid'
import { useState, useEffect, useRef, forwardRef } from 'react';
import { useTheme } from 'next-themes';
import TimePast from './TimePast';
import axios from 'axios';
import Link from "next/link"
import Comment from "./Comment"
import {useOnClickOutside} from "./Hooks"
import { useRouter } from 'next/router';
import { useActiveTab } from '../contexts/ActiveTabContext';
import Share from './Share';
import { useSocket } from '../contexts/SocketContext'
import { usePosts } from '../contexts/PostsContext';


const urlify = (text) => {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" class="link" target="_blank">${url}</a>`;
  })
}

const Post = forwardRef(({ _post, refreshUser, page }, ref) => {
  const { currentUser } = useAuth();
  const { setTabActive, tabActive } = useActiveTab();
  const [post, setPost] = useState(_post)
  const [author, setAuthor] = useState()
  const [hasLiked, setHasLiked] = useState(false)
  const [openComments, setOpenComments] = useState(false)
  const [openOptions, setOpenOptions] = useState(false)
  const [share, setShare] = useState(false)
  const [voted, setVoted] = useState(false)
  const [votingClosed, setVotingClosed] = useState(false)
  const [pdesc, setPDesc] = useState(page ? urlify(_post.description) : urlify(_post.description).slice(0, 100))
  const [newLike, setNewLike] = useState()
  const [newComment, setNewComment] = useState()
  const [shownComments, setShownComments] = useState([])
  const comRef = useRef()
  const { theme } = useTheme()
  const moreRef = useRef();
  const router = useRouter()
  const { socket } = useSocket()
  const { deletePost, unfollowUser } = usePosts()

  useOnClickOutside(moreRef, () =>setOpenOptions(false))

  useEffect(() => {
    if(currentUser){
      setHasLiked(post.likes?.findIndex((like)=> (like === currentUser?._id)) !== -1) //has liked
      if(post.type === "poll"){
        setVoted(post.poll.votes?.findIndex((v)=> (v === currentUser?._id)) !== -1)
        setVotingClosed(new Date(post.poll.expireAt) <= new Date())
      }
    }
    page ? setShownComments(post ? post.comments.reverse() : _post.comments.reverse()) : setShownComments(post ? post.comments.reverse().slice(0, 4) : _post.comments.reverse().slice(0, 4))
  }, [_post, post])

  useEffect(() => {
    async function getAuthor(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+post.authorId).then((res)=>{
        setAuthor(res.data)
      })
    }
    (!post.isAnonymous && !author) && getAuthor()
    page && setOpenComments(true)
  }, [])

  //socket
  useEffect(() => {
    if(currentUser && socket){
      socket.on("newLike", async (data) => {
        setNewLike(data)
      });
      socket.on("newComment",  async (data) => {
        setNewComment(data)
      });
      socket.on("deletePost",  async (data) => {
        post._id === data.id && deletePost(data.id)
      });
      socket.on("deleteComment",  async (data) => {
        setNewComment(data)
      });
    }
  }, [socket]);
  useEffect(() => {
    if(newLike && newLike.id === post._id){
      setPost((oldVal)=> {oldVal.updatedAt = newLike.updatedAt, newLike.status === true ? oldVal.likes.push(newLike.sender) : oldVal.likes = oldVal.likes.filter(id=> id !== newLike.sender); return {...oldVal}})
    }
  },[newLike])
  useEffect(() => {
    if(newComment && newComment.postId === post._id){
      if(newComment.commentId){
        setPost((oldVal)=> {oldVal.comments = oldVal.comments.filter(c=>c._id !== newComment.commentId); return {...oldVal}})
      }else{
        setPost((oldVal)=> {oldVal.comments.push(newComment); return {...oldVal}})
      }
    }
  },[newComment])

  //voted?
  useEffect(() => {
    if(post.type === "poll" && (voted || votingClosed)){
      const choices = document.getElementById(post._id).getElementsByClassName("poll-btn")
      if(voted){
        const chosen = post.poll.choices.find(c => c.votes.includes(currentUser._id))
        const selected = document.getElementById(chosen._id)
        selected.classList.replace("border-gray-400", "border-pink-500")
        selected.classList.replace("dark:border-gray-200", "dark:border-pink-500")
        selected.classList.replace("text-gray-500", "text-pink-500")
        selected.classList.replace("dark:text-gray-400", "dark:text-pink-500")
      }
        
      for (let i = 0; i < choices.length; i++) {
        const e = choices[i];
        const index = post.poll.choices.findIndex(c=>c._id === e.id.valueOf())
        const fillAmount = post.poll.choices[index].votes.length/post.poll.votes.length * 100
        e.children.item(0).style.width = `${fillAmount}%`
      }
    }
  },[voted, votingClosed])

  //resizing comment box
  useEffect(()=>{
    if(comRef.current){
      comRef.current.oninput = function() {
        comRef.current.style.height = ""; /* Reset the height*/
        comRef.current.style.height = comRef.current.scrollHeight + "px";
      }
    }
  },[comRef.current])

  //like post
  async function likePost(){
    if(currentUser){
      const prev = hasLiked 
      setHasLiked(!hasLiked)
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/like?userId=${currentUser?._id}`).then((res)=>{
        setPost(res.data)
        socket.emit("sendLike", {id: post._id, sender: currentUser._id, updatedAt: new Date(), status: !prev})
        if(currentUser._id !== author._id){
          !prev && socket.emit('sendNotification', {
            from: currentUser._id,
            to: author._id,
            type: "postLike",
            post: post._id,
          })
        }
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
        socket.emit("sendComment", {
          postId: post._id,
          authorId: currentUser._id,
          comment: comRef.current.value,
          createdAt: new Date(),
          _id: new Date(),
        })
        currentUser._id !== author._id && socket.emit('sendNotification', {
          from: currentUser._id,
          to: author._id,
          type: "postComment",
          comment: comRef.current.value,
          post: post._id,
        })
        comRef.current.value=""
      })
    }else{
      router.push('/login?returnUrl=/'+author._id)
    }
  }

  //delete a comment
  async function deleteComment(cid){
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/comment?comment=${cid}`, { headers: { Authorization: `Bearer ${currentUser?.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
      socket.emit('sendDeleteComment', {postId: post._id, commentId: cid})
      setPost(res.data)
    })
  }

  //delete posts
  async function deletePosts(){
    setOpenOptions(false)
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}`, { headers: { Authorization: `Bearer ${currentUser?.token}`}, withCredentials: true, credentials: 'include'}).then(()=>{
      socket.emit('sendDeletePost', {id: post._id})
      deletePost(post._id)
    })
  }
  
  //follow/unfollow
  function followUser(){
    setOpenOptions(false)
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${author._id}/follow`, {userId: currentUser?._id}).then((res)=>{
      if(res.data === "user has been unfollowed"){
        unfollowUser(author._id)
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: author._id,
          type: "unfollow",
        })
      }else{
        socket.emit('sendNotification', {
          from: currentUser._id,
          to: author._id,
          type: "follow",
        })
      }
      !post.isAnonymous && axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+post.authorId).then((res)=>{
        setAuthor(res.data)
      })
      refreshUser && refreshUser()
    })
  }

  //poll voting
  function pollVote(id){
    if(voted) return;
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/${post._id}/vote`,{id, user: currentUser._id}).then((res)=>{
      setPost(res.data)
      setVoted(true)
      currentUser._id !== author._id && socket.emit('sendNotification', {
        from: currentUser._id,
        to: author._id,
        type: "pollVote",
        post: post._id,
      })
    })
  }


  return (
    <div id={post?._id} ref={ref} className={`${page ? 'w-screen md:w-8/12' : 'w-screen p-1.5 md:w-102'}`}>
      <div className={`p-2 relative flex flex-grow flex-col ${page ? 'border-r border-gray-200 dark:border-bdark-200 ' : 'rounded-lg shadow-md bg-white dark:bg-bdark-100'}`}>
        <div className='py-1 flex border-b border-gray-200 dark:border-bdark-200 justify-between items-center'>
          <div className="flex items-center truncate">
          {!post.isAnonymous && <Link href={`/u/${author?.username}`} passHref><img className='h-9 w-9 mr-3 rounded-full object-cover cursor-pointer' src={author?.profilePicture}/></Link>}
            <span>
              {!post.isAnonymous && <span className='flex justify-center items-center space-x-2 w-full'>
                {author?.name ? <Link href={`/u/${author.username}`} passHref><span className='text-gray-500 dark:text-gray-400 text-lg font-semibold truncate cursor-pointer'>{author.name}</span></Link> : <div className='w-44 h-2.5 bg-gray-100 dark:bg-bdark-50 animate-pulse'/>}
                {author?.username ? <Link href={`/u/${author.username}`} passHref><span className='text-gray-500 dark:text-gray-400 text-sm truncate cursor-pointer'>@{author.username}</span></Link> : <div className='w-36 h-2.5 bg-gray-100 dark:bg-bdark-50 animate-pulse'/>}
              </span>}
              {post.isAnonymous && <p className='text-gray-600 dark:text-gray-400 text-lg truncate'>Anonymous</p>}
              <TimePast date={new Date(post.createdAt)}/>
            </span>
          </div>
          <div onClick={()=>setOpenOptions(true)}><DotsVerticalIcon className="h-5 text-gray-500 dark:text-gray-400 cursor-pointer"/></div>
          <div ref={moreRef} className={`absolute right-3 top-6 z-10 bg-white dark:bg-bdark-100 rounded-lg shadow-all overflow-hidden ${openOptions ? "w-40 transition-all duration-300" : "w-0 h-0 hidden"}`}>
            {(post.authorId !== currentUser?._id && !post.isAnonymous) && <div onClick={followUser} className="w-full text-center py-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-blue-grey-50 dark:hover:bg-bdark-200 border-b border-gray-200 dark:border-bdark-200">{author?.followers.indexOf(currentUser._id) > -1 ? "Unfollow" : "Follow"}</div>}
            {!page && <Link href={`/p/${post._id}`} passHref><div onClick={()=>setOpenOptions(false)} className="w-full text-center py-2 text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-blue-grey-50 dark:hover:bg-bdark-200 border-b border-gray-200 dark:border-bdark-200">Go To Post</div></Link>}
            {post.authorId === currentUser?._id && <div onClick={deletePosts} className="w-full text-center py-2 text-red-500 cursor-pointer hover:bg-blue-grey-50 dark:hover:bg-bdark-200">Delete Post</div>}
          </div>
        </div>
        {(post.type==="text"||post.type==="image" || post.type==="video") && <div className="py-2">
          <div className='text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words cursor-default' dangerouslySetInnerHTML={{__html: pdesc}}/>
          {(!page && post?.description.length > 100) && <p className="text-pink-500 cursor-pointer text-sm text-right" onClick={()=>{setPDesc(pdesc.length > 100 ? urlify(post?.description).slice(0, 100) : urlify(post?.description))}}>{pdesc?.length <= 100 ? '...Read more' : ' Read Less'}</p>}
        </div>}
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
              {post.type==="product" && <div className="absolute bg-gradient-to-t from-black to-transparent w-full bottom-0 text-white dark:text-gray-200 cursor-default px-2 sm:px-3 pt-3 sm:pt-9">
                <div className="w-full flex justify-between">
                  <p className="font-semibold text-xl w-9/12 truncate">{post.product.productCondition + " " + post.product.productName}</p>
                  <p title={post.product.productPrice === "0.00" ? "Free" : `GH₵${post.product.productPrice}`} className="font-semibold text-xl truncate">{post.product.productPrice === "0.00" ? "Free" : `GH₵${post.product.productPrice}`}</p>
                </div>  
                <div className='w-full py-1 sm:py-2'>
                    <div className='text-white dark:text-gray-200 whitespace-pre-wrap break-words max-h-40 overflow-y-auto hide-scrollbar' dangerouslySetInnerHTML={{__html: pdesc}}/>
                    {post?.description.length > 100 && <p className="text-pink-500 cursor-pointer text-sm text-right" onClick={()=>{setPDesc(pdesc.length > 100 ? urlify(post?.description).slice(0, 100) : urlify(post?.description))}}>{pdesc?.length <= 100 ? '...Read more' : ' Read Less'}</p>}
                </div>
                {author?._id !== currentUser._id && <button onClick={()=> router.push(`/chats?id=${author._id}`)} className="clicky h-11 w-full rounded-full bg-pink-500 mb-3">Messaage Seller</button>}
              </div>}
            </div>
            }
          {(post.type === 'image' && !post.media) && <div className='w-full h-96 bg-gray-200 dark:bg-bdark-50 animate-pulse'></div>}
          {post.type==="poll" && <div>
            <div className="py-2">
              <div className='text-gray-600 dark:text-gray-400 whitespace-pre-wrap break-words cursor-default' dangerouslySetInnerHTML={{__html: pdesc}}/>
              {post?.description.length > 100 && <p className="text-pink-500 cursor-pointer text-sm text-right" onClick={()=>{setPDesc(pdesc.length > 100 ? urlify(post?.description).slice(0, 100) : urlify(post?.description))}}>{pdesc?.length <= 100 ? '...Read more' : ' Read Less'}</p>}
            </div>
            {<div>
              {
                post.poll.choices.map(c=>
                  <button key={c._id} disabled={voted || votingClosed} id={c._id} onClick={()=> pollVote(c._id)} className={`poll-btn clicky border-gray-400 dark:border-gray-200 text-gray-500 dark:text-gray-400 ${(!voted && !votingClosed) && 'hover:bg-blue-grey-50 dark:hover:bg-bdark-50'}`}>
                    <div className="progress bg-blue-grey-50 dark:bg-bdark-200" style={{width: '0%', transition: "all .5s",}}></div>
                    <p className="z-10">{c.choice}</p>
                    {(voted || votingClosed) && <p className="absolute right-0 z-10 mr-4">{post.poll.votes.length === 0 ? "0" : parseInt(c.votes.length/post.poll.votes.length * 100)}%</p>}
                  </button>
                )
              }
              <span className="text-gray-400 dark:text-gray-500 text-xs mt-3"><span>{post.poll.votes.length === 1 ? '1 vote' : `${post.poll.votes.length} votes`}</span><span> · </span><span>{votingClosed ? "ended" : "ongoing"}</span></span>
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
          <div className={`${openComments ? 'h-full bg-white dark:bg-bdark-100 mt-2' : 'h-0 hidden'}`}>
            <div className='flex items-center justify-center w-full py-3 bg-white dark:bg-bdark-100'>
              <form className='flex items-center justify-center bg-blue-grey-50 dark:bg-bdark-200 rounded-lg focus:ring-1 focus:ring-gray-500 w-full' onSubmit={commentOnPost}>
                <textarea ref={comRef} type = 'text' className='max-h-32 overflow-y-auto hide-scrollbar no-ta-resize outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 h-10 p-2 overflow-hidden bg-transparent w-full' placeholder='Write a comment' />
                <button className='text-center text-pink-500 mr-4 hover:font-bold font-semibold transition-all duration-150' type='submit'>Comment</button>
              </form>
            </div>
            {post.comments?.length !== 0 ? 
              <div className='border-t border-gray-200 dark:border-bdark-200 py-1'>
              {!page && <div className="flex justify-between items-center mb-1">
                <div className="text-gray-500 dark:text-gray-400 font-semibold">Comments</div>
                <Link href={`/p/${post._id}`} passHref><div className="text-pink-500 text-sm cursor-pointer">See all comments</div></Link>
              </div>}
                {
                  shownComments.map((comment)=>
                    <Comment key={comment._id} comment={comment} admin={comment.authorId === currentUser?._id} delCom={deleteComment}/>
                  )
                }
              </div>
              :
              <div className="text-gray-500 dark:text-gray-400 h-16 flex justify-center items-center">
                Be the first to comment on this
              </div>
            }
          </div>
        }
        <div className={`flex justify-around border-t border-gray-200 dark:border-bdark-200 pt-2 ${page && 'border-b pb-1'}`}>
          <div onClick={likePost} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            {hasLiked?<Filled className='text-pink-500 h-6 w-6 mr-2' /> : <HeartIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />}
            {post.likes?.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-pointer'>{post.likes.length}</p>}
          </div>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
          <div onClick={()=>{if(page){comRef.current?.scrollIntoView({behavior: "smooth"}); comRef.current.focus();}else{!openComments && comRef.current.focus(); setOpenComments(!openComments);}}} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            <ChatAltIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
            {post.comments?.length > 0 && <p className='text-gray-500 dark:text-gray-400 cursor-pointer'>{post.comments.length}</p>}
          </div>
          <div className='h-12 border-r border-gray-200 dark:border-bdark-200'></div>
          <div onClick={()=> {setTabActive('share'); setShare(true)}} className='flex flex-grow justify-center items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-50'>
            <ShareIcon className='text-gray-500 dark:text-gray-400 h-6 w-6 mr-2' />
          </div>
        </div>
      </div>
      {(share && tabActive[tabActive.length - 1] === 'share') && <Share setShare={setShare} username={author? author.username : "an anonymous user"} link={`${process.env.NEXT_PUBLIC_CLIENT_URL}/p/${post._id}`}/>}
    </div>
  )
})

export default Post
