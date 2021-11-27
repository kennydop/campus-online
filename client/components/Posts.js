import Post from './Post';
import FlipMove from 'react-flip-move';
import PostPlaceholder from './PostPlaceholder';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function Posts() {
  const [posts, setPosts] = useState()
  const { currentUser } = useAuth()
  useEffect(()=>{
    axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/home/"+currentUser._id).then((res)=>{
      setPosts(res.data)
      console.log(res.data)
    })
  },[])
  return (
    posts && posts?.length !== 0 ?
    <FlipMove>
      {posts?.map(post => (
      <Post
        key={post._id}
        id={post._id}
        authorName={post.authorName}
        authorUsername={post.authorUsername}
        description={post.description}
        timestamp={post.createdAt}
        authorImg={post.authorImg}
        media={post.media}
        type={post.type}
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
