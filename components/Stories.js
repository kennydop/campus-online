import Story from './Story';

const stories = [
    {
        name: 'my story',
    },
    {
        name: 'kennydop',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210626-WA0007.jpg?alt=media&token=a270efe0-c5d1-4ece-bdd8-b5d465ef3d75',
        blurData: 'LDFO=so:4,x|53%i%jISo=%N%Ne+'
    },
    {
        name: 'sethaddo',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210713-WA0001.jpg?alt=media&token=9353267c-73fe-4ff9-9f38-960432b9c509',
        blurData: 'LsHo^0w?bEkCGKoLn%jZbHS%j=js'
    },
    {
        name: 'trayl',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a',
        blurData: 'L6S~hmtR%1%g~qQSD%Qmu4oy*yMx'
    },
    {
        name: 'ben ji',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae',
        blurData: 'LkKuA=WZ}ssS}ZR+-Ao0EfjYNZoL'
    },
    {
        name: 'ian wright',
        src: 'https://scontent.facc5-1.fna.fbcdn.net/v/t1.6435-9/54354250_430498804365015_238293912387584000_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeH9g8SZJueMPWsU9f_OCrjLwfS_AneM3KPB9L8Cd4zco7CpcH15y618-8HkvoluXvrc0QfeeAP9hdJQVw2qXi77&_nc_ohc=gugywDVe5RAAX-8avQO&_nc_ht=scontent.facc5-1.fna&oh=77ba445c37c61f2446d1f1a3dd236d4d&oe=61445AFE',
        blurData: 'L76uL*jZ00kD%$ayH=kC4TbH.Tae'
    },
    {
        name: 'eustace',
        src: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Flicensed-image.jfif?alt=media&token=2de6c6bb-9b09-416e-9473-744fb24b6dae',
        blurData: 'LkKuA=WZ}ssS}ZR+-Ao0EfjYNZoL'
    },
]

function Stories() {
    return (
        <div className='flex space-x-6 justify-center mx-auto my-3 whitespace-nowrap'>
            {stories.map((story)=>(<Story name={story.name} src={story.src} blurData={story.blurData}/>))}
        </div>
    )
}

export default Stories
