import axios from "axios"
import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import ProfileToFollow from "./ProfileToFollow"
const profiles = [
    {
        key: '1',
        name:'kennydop',
        pic: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2F0_OnDYE8LBtGH-sX7q.jpeg?alt=media&token=26e559ed-7778-460e-aa68-810efe0e0500',
        blurData: 'LQHy8v9]~p?b_3H?%~.8yEXSn3W.'
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
  const {currentUser} = useAuth()
  const [suggestions, setSuggestions] = useState()

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/users/${currentUser._id}/suggestions`).then((res)=>{
      setSuggestions(res.data)
    })
  },[])

    return (
      suggestions?
        <div className='hidden lg:block h-full sticky top-20 m-2 mt-3 p-2 w-tt'>
            <div className='p-2 text-gray-500 dark:text-gray-400 text-center font-bold cursor-default'>
                <p>Suggestions to follow</p>
            </div>
            {suggestions.map((suggestion)=> <ProfileToFollow key={suggestion._id} id={suggestion._id} userId={currentUser._id} name={suggestion.username} pic={suggestion.profilePicture} college={suggestion.college}/>)}
            <div className='text-center text-pink-500  cursor-pointer hover:font-bold fit-content mx-auto'>
                <p>More</p>
            </div>
        </div>:
        <></>
    )
}

export default PeopleYouMightKnow
