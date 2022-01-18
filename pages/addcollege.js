/* eslint-disable react-hooks/exhaustive-deps */
import {useRouter} from 'next/router';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AcademicCapIcon } from '@heroicons/react/outline';
import NotFound from "../components/404"
import axios from 'axios';

function AddCollege({colleges}) {
  const {currentUser, setCurrentUser} = useAuth();
  const router = useRouter();
  const [college, setCollege] = useState("");
  const [error, setError] = useState("");
  const [filledColleges, setfilledColleges] = useState(false);
  const [confirmCollegeLoading, setConfirmCollegeLoading] = useState(false);

  useEffect(()=>{
    if(colleges){
      fillColleges();
    }else{
      refillColleges()
    }
  },[])
  async function refillColleges(){
    if(!filledColleges){
      await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/colleges").then((cols)=>{        
        cols.data.forEach((col) => {
          var collegeOption = document.createElement("option");
          collegeOption.innerHTML = col.name;
          document.getElementById('colleges').appendChild(collegeOption)
        });
      });
      setfilledColleges(true);
    }
  }
  function fillColleges(){
    colleges.forEach(col => {
      if(!filledColleges){
        var collegeOption = document.createElement("option");
        collegeOption.innerHTML = col.name;
        document.getElementById('colleges').appendChild(collegeOption)
      }
    });
    setfilledColleges(true);
  }

  async function confirmCollege(){
    setConfirmCollegeLoading(true)
    setError("")
    if(college){
      if(college === "Select College"){
        setError('Please select your college');
        setConfirmCollegeLoading(false);
        return;
      }
      axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`, { college }, { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
        setCurrentUser((oldValues) => {return {token: oldValues.token, ...res.data}})
        // currentUser.profilePicture ? router.replace('/feed') : router.replace('/addprofileimg')
        router.replace('/')
      }).catch((error)=>{
        setError(error.message)
      })
    }else{
      setError('Please select your college');
      setConfirmCollegeLoading(false);
    }
  }

  return (
    !currentUser.college ?
    <div className = "h-screen flex flex-col items-center justify-center bg-white dark:bg-bdark-100">
      <div className = "mb-10"><h1 className = "text-lg font-bold text-gray-500 dark:text-gray-400">Finish Setting up your Account</h1></div>
        {error&&<p className='errorMsg'>{error}</p>}
      <div className = "bg-blue-grey-50 dark:bg-bdark-200 rounded-full justify-center h-12 w-80 mb-5 p-1">
        <label htmlFor='colleges' className='flex w-full h-full justify-end'>
          <AcademicCapIcon className="text-gray-500 dark:text-gray-400 w-6 text-center mx-2"/>
          <select id = 'colleges' value={college} onChange = {e=>setCollege(e.target.value)} required = "required" className = "bg-blue-grey-50 dark:bg-bdark-200 text-gray-500 dark:text-gray-400"><option>Select College</option></select>
        </label>
      </div>
      <div className = "mt-6">
        <button disabled={confirmCollegeLoading} type = "button" className = "infobutton" onClick={confirmCollege}>
          {confirmCollegeLoading ? <div className="loader mx-auto animate-spin"></div> : <>Confirm</>}
        </button>
      </div>
    </div>
      :
    <NotFound/>
  )
}

export async function getStaticProps() {
  const colleges = await (await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/colleges")).data
  
  return {
    props: {
      colleges,
    },
  }
}
export default AddCollege
