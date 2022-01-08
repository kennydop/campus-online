/* eslint-disable react-hooks/exhaustive-deps */
import { FeedLayout } from "../Layouts/Layouts"
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';
import axios from "axios";
import Posts from "../components/Posts";
import { PostsProvider } from "../contexts/PostsContext";

export default function Global({trending}) {
  const { setTabActive } = useActiveTab()

  useEffect(()=>{
    setTabActive('global');
  },[])
    
  return (
    <PostsProvider>
      <div>
        <div className='mt-2'></div>
          <div className='flex flex-col'>
            <div className='mx-auto mt-3'>
              <Posts global/>
            </div>
          <div className='pt-20'></div>
        </div>
      </div>
    </PostsProvider>
  )
}

Global.getLayout = function getLayout(page) {
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