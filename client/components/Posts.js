import Post from './Post';
import FlipMove from 'react-flip-move';
import PostPlaceholder from './PostPlaceholder';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Posts() {
  const [posts, setPosts] = useState()
  const { currentUser, refreshPosts, setRefreshPosts } = useAuth()

  useEffect(()=>{
    axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/home/"+currentUser._id).then((res)=>{
      setPosts(res.data)
      setRefreshPosts(false)
    })
  },[refreshPosts === true])

  return (
    posts && posts?.length !== 0 ?
    <FlipMove>
      {posts?.map(post => (
      <Post
        key={post._id}
        _post={post}
      />))}
    </FlipMove>
      :
    <>
    <PostPlaceholder type={'text'}/>
    <PostPlaceholder type={'image'}/>
    <PostPlaceholder type={'image'}/>
    </>
  )
}

export default Posts
