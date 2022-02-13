import { SiteLayout } from "../Layouts/Layouts"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import axios from "axios"
import Post from "../components/Post"
import FlipMove from 'react-flip-move';
import { useAuth } from "../contexts/AuthContext";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import { useActiveTab } from "../contexts/ActiveTabContext";

function Trending() {
  const router = useRouter()
  const [ posts, setPosts ] = useState()
	const { setTabActive } = useActiveTab()

  useEffect(()=>{
    setTabActive('trending');
  },[])

  useEffect(()=>{
    async function getPosts(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/trendingposts?word="+router.query.word).then((res)=>{
        setPosts(res.data)
      })
    }
    getPosts()
  },[router.query.word])
  
  return (
    <>
    <div className="flex mx-auto w-full justify-center space-x-8">
      {(posts && posts?.length !== 0) &&
      <>
      <div className="ml-0 lg:ml-44 mt-6">
      <FlipMove>
        {posts?.map(post => (
          <Post
          key={post._id}
          _post={post}
          />))}
      </FlipMove>
      </div>
      <PeopleYouMightKnow/>
      </>}
    {!posts &&
    <>
    <div className="mt-8">
      <div className="loader-bg mx-auto animate-spin"></div>
    </div>
    </>}
    {(posts && posts?.length === 0) && 
      <div className='mt-16 flex flex-col justify-center items-center cursor-default text-gray-500 dark:text-gray-400 space-y-3'>
        <svg width="96" height="96" fill="none" class="mx-auto text-gray-500 dark:text-gray-400"><path d="M36 28.024A18.05 18.05 0 0025.022 39M59.999 28.024A18.05 18.05 0 0170.975 39" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><ellipse cx="37.5" cy="43.5" rx="4.5" ry="7.5" fill="currentColor"></ellipse><ellipse cx="58.5" cy="43.5" rx="4.5" ry="7.5" fill="currentColor"></ellipse><path d="M24.673 75.42a9.003 9.003 0 008.879 5.563m-8.88-5.562A8.973 8.973 0 0124 72c0-7.97 9-18 9-18s9 10.03 9 18a9 9 0 01-8.448 8.983m-8.88-5.562C16.919 68.817 12 58.983 12 48c0-19.882 16.118-36 36-36s36 16.118 36 36-16.118 36-36 36a35.877 35.877 0 01-14.448-3.017" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.997 71.75A14.94 14.94 0 0148 70.5c2.399 0 4.658.56 6.661 1.556a3 3 0 003.999-4.066 12 12 0 00-10.662-6.49 11.955 11.955 0 00-7.974 3.032c1.11 2.37 1.917 4.876 1.972 7.217z" fill="currentColor"></path></svg>
        No Posts for "{router.query.word}"
      </div>
    }
    </div>
    <div className='pt-20'></div>
    </>
  )
}

Trending.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
      {page}
    </SiteLayout>
  )
}


export default Trending
