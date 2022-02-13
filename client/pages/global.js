/* eslint-disable react-hooks/exhaustive-deps */
import { FeedLayout } from "../Layouts/Layouts"
import { useActiveTab } from "../contexts/ActiveTabContext";
import { useEffect } from 'react';
import Posts from "../components/Posts";

export default function Global() {
  const { setTabActive } = useActiveTab()

  useEffect(()=>{
    setTabActive('global');
  },[])
    
  return (
    <div>
      <div className='mt-2'></div>
        <div className='flex flex-col'>
          <div className='mx-auto mt-3'>
            <Posts global/>
          </div>
        <div className='pt-20'></div>
      </div>
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
