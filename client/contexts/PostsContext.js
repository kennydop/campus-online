import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useUtils } from './UtilsContext';

const PostsContext = createContext()

export function usePosts(){
  return useContext(PostsContext)
}

export function PostsProvider({children}) {
  const [feedPosts, setFeedPosts] = useState()
  const [globalPosts, setGlobalPosts] = useState()
  const { currentUser } = useAuth()
  const { refreshPosts, setNewPosts } = useUtils()
  
  useEffect(()=>{
    async function getGlobalPosts(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/global").then((res)=>{
        setGlobalPosts(res.data)
      })
    }
    async function getFeedPosts(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/home/"+currentUser._id).then((res)=>{
        setFeedPosts(res.data)
        setNewPosts(0)
      })
    }
    getFeedPosts()
    getGlobalPosts()
  },[refreshPosts === true])

  function deletePost(id){
    setFeedPosts((oldVal)=>{
      oldVal = oldVal.filter(p=>p._id !== id)
      return [...oldVal]
    })
  }

  function unfollowUser(id){
    setFeedPosts((oldVal)=>{
      oldVal = oldVal.filter(p=>p.authorId !== id)
      return [...oldVal]
    })
  }

  const value={
    feedPosts,
    globalPosts,
    deletePost,
    unfollowUser
  }
  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}

