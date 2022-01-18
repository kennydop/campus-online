/* eslint-disable react-hooks/exhaustive-deps */
import Post from './Post';
import FlipMove from 'react-flip-move';
import { useEffect, useState } from 'react';
import PeopleYouMightKnow from './PeopleYouMightKnow';
import axios from 'axios';

function MyPosts({ admin, user, refreshUser }) {
  const [myPosts, setMyPosts] = useState(null);

  useEffect(()=>{
    async function getMyPosts(){
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/posts/user/${user._id}`).then((res)=>{
        setMyPosts(res.data)
      })
    }
    getMyPosts()
  }, [user])
  
  return (
    <>
      <div className='my-5 border-b dark:border-bdark-100 text-gray-500 dark:text-gray-400 py-3 pl-4 md:mx-auto w-full md:w-8/12 cursor-default'>Posts</div>
      <div className='flex mx-auto w-full justify-center space-x-8'>
        {myPosts?.length !== 0 ?
        <>
          <FlipMove>
            {myPosts?.map((post)=>(
            <Post
              key={post._id}
              _post={post}
              refreshUser={refreshUser}
            />))}
          </FlipMove>
          <PeopleYouMightKnow/>
          </>:
          <div className="text-gray-500 dark:text-gray-400 mt-10">
          {admin ? "You have not made any posts yet" : `${user.username} has not made any posts yet`}
        </div>
        }
      </div>
    </> 
  )
}

export default MyPosts
