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
        name: 'ben ji',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae'
    },
    {
        name: 'ian wright',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae'
    },
    {
        name: 'eustace',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae'
    },
]

function Stories() {
    const [session] = useSession()
    return (
        <div className='flex space-x-6 justify-center mx-auto my-3'>
            {stories.map((story)=>(<Story name={story.name} src={story.src}/>))}
        </div>
    )
}

export default Stories
