import ProfileToFollow from "./ProfileToFollow"

const profiles = [
    {
        key: '1',
        name:'kennydop',
        pic: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG_5819%20(1).jpg?alt=media&token=8d9bed35-614b-4537-9823-4ff0fd41743c',
        blurData: 'LBEyMr?Gta9F0cV[-@xI?cMyxbsW'
    }, 
    {
        key: '2',
        name: 'sethaddo',
        pic: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2FIMG-20210713-WA0001.jpg?alt=media&token=9353267c-73fe-4ff9-9f38-960432b9c509',
        blurData: 'LsHo^0w?bEkCGKoLn%jZbHS%j=js'
    }, 
    {
        key: '3',
        name: 'Dannings',
        pic: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fdownload.jfif?alt=media&token=fe85d6f9-fa5d-4f00-a660-442113a7acdd',
        blurData: 'LBFFQi9asFbbN6^*NF%2~KkEaKxt'
    }, 
    {
        key: '4',
        name: 'KAMI',
        pic: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a',
        blurData: 'L6S~hmtR%1%g~qQSD%Qmu4oy*yMx'
    }
]

function PeopleYouMightKnow() {
    return (
        <div className='p-2 hidden lg:block lg:w-1/4 mr-2 sticky top-0'>
            <div className='mt-3 p-2 self-center bg-white dark:bg-bdark-100 rounded-xl shadow-md'>
                <div className='border-b dark:border-bdark-200 p-2 text-gray-500 dark:text-gray-400 text-center font-bold'>
                    <p>Suggestions to follow</p>
                </div>
                {profiles.map((profile)=> <ProfileToFollow key={profile.key} name={profile.name} pic={profile.pic} blurData={profile.blurData}/>)}
            </div>
        </div>
    )
}

export default PeopleYouMightKnow
