/* eslint-disable react-hooks/exhaustive-deps */
import FeedContent from "../components/FeedContent"
import Stories from "../components/Stories"
import { FeedLayout } from "../Layouts/Layouts"
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';

export default function Global() {
  const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()

  useEffect(()=>{
    if(!currentUser.token){
      router.replace('/')
    }
    if(tabActive==='global')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('global');
  },[])
    
  return (
    <div>
      {/* <Stories/> */}
      <div className='mt-6'></div>
      <FeedContent />
    </div>
  )
}

Global.getLayout = function getLayout(page) {
  return (
    <FeedLayout>
      {page}
    </FeedLayout>
  )
}