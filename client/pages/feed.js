/* eslint-disable react-hooks/exhaustive-deps */
import FeedContent from "../components/FeedContent";
import Stories from "../components/Stories";
import { FeedLayout } from "../Layouts/Layouts";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';

function Feed() {
    const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()

    useEffect(()=>{
        if(tabActive==='home')return; 
        setPrevPrevTab(prevTab); 
        setPrevTab(tabActive); 
        setTabActive('home');
    },[])
    
    return (
        <div>
            <Stories />
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
