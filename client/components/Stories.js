import { useEffect, useRef, useState } from 'react';
import Story from './Story';
import { ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { PlusIcon } from "@heroicons/react/outline"


// const stories = [
//     {
//         key: '111',
//         name: 'my story',
//     },
//     {
//         key: '1',
//         name: 'kennydop',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG_5819%20(1).jpg?alt=media&token=8d9bed35-614b-4537-9823-4ff0fd41743c',
//         blurData: 'LBEyMr?Gta9F0cV[-@xI?cMyxbsW'
//     },
//     {
//         key: '2',
//         name: 'Eustace',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae',
//         blurData: 'LkKuA=WZ}ssS}ZR+-Ao0EfjYNZoL'
//     },
//     {
//         key: '3',
//         name: 'sethaddo',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210713-WA0001.jpg?alt=media&token=9353267c-73fe-4ff9-9f38-960432b9c509',
//         blurData: 'LsHo^0w?bEkCGKoLn%jZbHS%j=js'
//     },
//     {
//         key: '4',
//         name: 'trayl',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a',
//         blurData: 'L6S~hmtR%1%g~qQSD%Qmu4oy*yMx'
//     },
//     {
//         key: '5',
//         name: 'Dannings',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fwe_small.png?alt=media&token=fed9e01a-1daf-4da8-a34f-840884368e99',
//         blurData: 'LHSijaof^*t7WEoeofWB~Vt64:Rj'
//     },
//     {
//         key: '6',
//         name: 'Aberama',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fab6761610000e5ebe8637c96a7aa2917eae3c54d.jfif?alt=media&token=78c9df84-97bc-43ab-a2d0-65ad268d1f86',
//         blurData: 'LTPp_wIn_7-D%CtLM-RW=Kt6EfIp'
//     },
//     {
//         key: '7',
//         name: 'vc',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcompany.png?alt=media&token=9153d362-56c0-45a3-bff5-8f1cb4dc6492',
//         blurData: 'L1Ra36,[L#,t}GfQf6j[L#f6y?kC'
//     },
//     {
//         key: '8',
//         name: 'KAMI',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Farthur.jpg?alt=media&token=4ac5d55f-8f01-4224-93c0-9cb1da2e9556',
//         blurData: 'L7GHVV:%0g~U010hEN?F00?GQ.9c'
//     },
//     {
//         key: '9',
//         name: 'krish💦',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2F1download%20(1).jpg?alt=media&token=7b00b65d-9e0b-49db-ad6e-5702b1d4edde',
//         blurData: 'LCD0Go-;~qM{RjWBxuRjM{ayxuxu'
//     },
//     {
//         key: '10',
//         name: 'blue💙',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchristina-wocintechchat-com-S3GrMiUhpNU-unsplash.jpg?alt=media&token=0caa75e2-1743-4068-95ab-b1c22314ea87',
//         blurData: 'LPF~p*xv.lMy_1xuxvR+RPWBMyjZ'
//     },
//     {
//         key: '11',
//         name: 'bree_',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fistockphoto-1042424400-170667a.jpg?alt=media&token=6ff03bf0-e90e-49a4-8fbc-780dddd4f25c',
//         blurData: 'LB9?g[M_01-qR3xvb_IU15jX}nW='
//     },
//     {
//         key: '12',
//         name: 'narh🎀',
//         src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fnarh.jpg?alt=media&token=38e9d671-8750-4b6b-a430-cf04161d0e5a',
//         blurData: 'L69Zcd-o015Rtlj@oLWB0fNG~B$*'
//     },
// ]

function Stories({userId}) {
  const [ stories, setStories ] = useState()
  const { currentUser } = useAuth()

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/stories/${userId}`).then((res)=>{
      setStories(res.data)
    })
  },[])
    const storiesRef = useRef(null);
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
