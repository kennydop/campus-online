/* eslint-disable react-hooks/exhaustive-deps */
import FeedContent from "../components/FeedContent";
import Stories from "../components/Stories";
import { FeedLayout } from "../Layouts/Layouts";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";

function Feed() {
    const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
    const { currentUser } = useAuth()
    const router = useRouter()
    useEffect(()=>{
      if(!currentUser.token){
        router.replace('/')
      }
        if(tabActive==='home')return; 
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('home');
    },[])
    
    return (
        <div>
            {/* <Stories userId={currentUser._id}/> */}
            <div className='mt-6'></div>
            <FeedContent />
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
export default Feed
