import { useEffect, useRef, useState } from 'react';
import Story from './Story';
import { ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { PlusIcon } from "@heroicons/react/outline"

function Stories({userId}) {
  const [ stories, setStories ] = useState()
  const { currentUser } = useAuth()
  const storiesRef = useRef(null);

  useEffect(()=>{
    async function getStories(){
      axios.get(`http://localhost:5000/api/stories/${userId}`).then((res)=>{
        setStories(res.data)
      })
    }
    getStories()
  },[])
  
    function sideScroll(element, speed, distance, step){
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            element.scrollLeft += step;
            scrollAmount += Math.abs(step);
                if (scrollAmount >= distance) {
                clearInterval(slideTimer);
                }
            }, speed);
        };

    return (
      stories?.length !==0 ?
        <div className='flex'>
            <div onClick={()=>{sideScroll(storiesRef.current, 20, 420, -15)}} className='h-5 w-5 hidden md:block self-center rounded-full bg-gray-500 dark:bg-bdark-100 cursor-pointer ml-3 mr-1'>
                <ChevronLeftIcon className='text-blue-grey-50 dark:text-gray-400'/>
            </div>
            <div ref={storiesRef}className='hide-scrollbar space-x-5 justify-center my-4 w-screen md:w-105 px-3 md:px-0 whitespace-nowrap overflow-x-auto'>
                {stories?.map((story)=>(<Story key={story._id} id={story._id} userId={story.userId} name={story.username} src={story.img} type={story.storyType} description={story.description} likes={story.likes} />))}
            </div>
            <div onClick={()=>{sideScroll(storiesRef.current, 20, 420, 15)}} className='h-5 w-5 hidden md:block self-center rounded-full bg-gray-500 dark:bg-bdark-100 cursor-pointer mr-3 ml-1'>
                <ChevronRightIcon className='text-blue-grey-50 dark:text-gray-400'/>
            </div>
        </div>:
        <div className='relative h-15 w-15'> 
          <img className='object-cover rounded-full h-14 w-14'
            src={currentUser.profilePicture}/>
          <div className='absolute right-0 top-0 rounded-full p-0.5 bg-pink-500 border-2 border-blue-grey-50 dark:border-bdark-200'>
            <PlusIcon className='text-blue-grey-50 w-3 h-3'/>
          </div>
        </div>
    )
}

export default Stories
