/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase/firebase';
import Post from './Post';
import FlipMove from 'react-flip-move';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import PeopleYouMightKnow from './PeopleYouMightKnow';
import axios from 'axios';

function MyPosts() {
    const { currentUser } = useAuth();
    const [myPosts, setMyPosts] = useState();

    useEffect(()=>{
      axios.get(`http://localhost:5000/api/posts/user/${currentUser._id}`).then((res)=>{
        setMyPosts(res.data)
      })
    }, [])
  return (
    <>
      <div className='my-6 border-b dark:border-bdark-50 text-gray-500 dark:text-gray-400 py-3 pl-4 mb-4 md:mx-auto w-full md:w-8/12 cursor-default'>Posts</div>
      <div className='flex mx-auto w-full justify-center space-x-3'>
        {myPosts.length !== 0 ?
        <>
          <FlipMove>
              {myPosts?.map((post)=>(
              <Post
                  key={post.id}
                  id={post.id}
                  name={post.data().name}
                  message={post.data().message}
                  email={post.data().email}
                  timestamp={post.data().timestamp}
                  image={post.data().image}
                  postImage={post.data().postImage}
                  postType={post.data().postType}
              />))}
          </FlipMove>
          <PeopleYouMightKnow/>
          </>:
          <div className="text-gray-500 dark:text-gray-400 mt-10">
          You have not made any posts yet
        </div>
        }
      </div>
    </> 
  )
}

export default MyPosts
