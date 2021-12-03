/* eslint-disable react-hooks/exhaustive-deps */
import { FeedLayout } from "../Layouts/Layouts"
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';

export default function Global() {
  const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()

  useEffect(()=>{
    if(tabActive==='global')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('global');
  },[])
    
  return (
    <div>

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