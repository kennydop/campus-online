import {useAuth} from "../contexts/AuthContext"
import { useState } from "react"

function Test() {
  const [info, setInfo]=useState()
  const { currentUser } = useAuth()
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center'>
      <div className='border h-64 w-2/5 overflow-scroll'>
        {currentUser.username}
      </div>
      <button onClick={()=>{getUserInfo("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTkyMGE5MTg2ZTI0MzZmYjQyMjhmZjgiLCJ1c2VybmFtZSI6ImNsaWVudDEiLCJlbWFpbCI6ImNsaWVudDFAZW1haWwuY29tIiwiaWF0IjoxNjM2OTYwOTE2LCJleHAiOjE2MzY5NjE4MTZ9.-MjcIaOfXq9iYbxsQpftRWzHuTEsKwwGuR_XywRiue4")}} className='bg-green-500 mt-5 w-36 h-12 rounded-lg outline-none'>Here</button>
    </div>
  )
}

export default Test
