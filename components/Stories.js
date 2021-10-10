import { useRef } from 'react';
import Story from './Story';
import { ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/solid';

const stories = [
    {
        key: '11',
        name: 'my story',
    },
    {
        key: '1',
        name: 'kennydop',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210626-WA0007.jpg?alt=media&token=a270efe0-c5d1-4ece-bdd8-b5d465ef3d75',
        blurData: 'LDFO=so:4,x|53%i%jISo=%N%Ne+'
    },
    {
        key: '2',
        name: 'Eustace',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae',
        blurData: 'LkKuA=WZ}ssS}ZR+-Ao0EfjYNZoL'
    },
    {
        key: '3',
        name: 'sethaddo',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210713-WA0001.jpg?alt=media&token=9353267c-73fe-4ff9-9f38-960432b9c509',
        blurData: 'LsHo^0w?bEkCGKoLn%jZbHS%j=js'
    },
    {
        key: '4',
        name: 'trayl',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a',
        blurData: 'L6S~hmtR%1%g~qQSD%Qmu4oy*yMx'
    },
    {
        key: '5',
        name: 'Dannings',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fwe_small.png?alt=media&token=fed9e01a-1daf-4da8-a34f-840884368e99',
        blurData: 'LHSijaof^*t7WEoeofWB~Vt64:Rj'
    },
    {
        key: '6',
        name: 'Aberama',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fab6761610000e5ebe8637c96a7aa2917eae3c54d.jfif?alt=media&token=78c9df84-97bc-43ab-a2d0-65ad268d1f86',
        blurData: 'LTPp_wIn_7-D%CtLM-RW=Kt6EfIp'
    },
    {
        key: '7',
        name: 'vc',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcompany.png?alt=media&token=9153d362-56c0-45a3-bff5-8f1cb4dc6492',
        blurData: 'L1Ra36,[L#,t}GfQf6j[L#f6y?kC'
    },
    {
        key: '8',
        name: 'KAMI',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Farthur.jpg?alt=media&token=4ac5d55f-8f01-4224-93c0-9cb1da2e9556',
        blurData: 'L7GHVV:%0g~U010hEN?F00?GQ.9c'
    },
]

function Stories() {
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
        <div className='flex'>
            <div onClick={()=>{sideScroll(storiesRef.current, 20, 420, -15)}} className='h-5 w-5 hidden md:block self-center rounded-full bg-gray-500 dark:bg-bdark-100 cursor-pointer ml-3 mr-1'>
                <ChevronLeftIcon className='text-blue-grey-50 dark:text-gray-400'/>
            </div>
            <div ref={storiesRef}className='hide-scrollbar space-x-5 justify-center my-4 w-screen md:w-105 px-3 md:px-0 whitespace-nowrap overflow-x-auto'>
                {stories.map((story)=>(<Story name={story.name} src={story.src} blurData={story.blurData} key={story.key}/>))}
            </div>
            <div onClick={()=>{sideScroll(storiesRef.current, 20, 420, 15)}} className='h-5 w-5 hidden md:block self-center rounded-full bg-gray-500 dark:bg-bdark-100 cursor-pointer mr-3 ml-1'>
                <ChevronRightIcon className='text-blue-grey-50 dark:text-gray-400'/>
            </div>
        </div>
    )
}

export default Stories
