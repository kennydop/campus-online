/* eslint-disable react-hooks/exhaustive-deps */
import AddPost from "../components/AddPost"
import Posts from "../components/Posts"
import { FeedLayout } from "../Layouts/Layouts";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';
import axios from "axios";

function Feed({trending}) {
  const { setTabActive } = useActiveTab()

  useEffect(()=>{
    setTabActive('home');
  },[])
    
  return (
    <div>
      {/* <Stories userId={currentUser._id}/> */}
      <div className='mt-2'></div>
        <div className='flex flex-col'>
          <div className='mx-auto mt-3'>
            <AddPost/>
            <Posts/>
          </div>
        <div className='pt-20'></div>
      </div>
    </div>
  )
}
Feed.getLayout = function getLayout(page) {
  return (
    <FeedLayout>
      {page}
    </FeedLayout>
  )
}

export async function getServerSideProps() {
  const trending = await (await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/trending")).data
  
  return {
    props: {
      trending,
    },
  }
}

export default Feed
