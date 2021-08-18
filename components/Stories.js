import { useSession } from 'next-auth/client';
import Story from './Story';

const stories = [
    {
        name: 'my story',
    },
    {
        name: 'kennydop',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210626-WA0007.jpg?alt=media&token=a270efe0-c5d1-4ece-bdd8-b5d465ef3d75'
    },
    {
        name: 'sethaddo',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210713-WA0001.jpg?alt=media&token=9353267c-73fe-4ff9-9f38-960432b9c509'
    },
    {
        name: 'trayl',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a'
    },
    {
        name: 'raph ji',
        src: 'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRoMhA22H_KyZ_83HpDmKdM8MlVm0SRGi41ntQByDcUlu3R6uZM8iI8o1TsqJ7g'
    },
]

function Stories() {
    const [session] = useSession()
    return (
        <div className='flex justify-center mx-auto my-3'>
            {stories.map((story)=>(<Story name={story.name} src={story.src}/>))}
        </div>
    )
}

export default Stories
