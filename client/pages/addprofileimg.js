/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import { useState } from "react";
import {useRouter} from 'next/router';
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import NotFound from "../components/404"

function AddProfileImg() { 
  const [imgPreview, setImgPreview] = useState(null);
  const [buttonText, setButtonText] = useState('Skip');
  const [bigFile, setBigFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  var selected = null;
  const [url, setUrl] = useState();
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuth();

  const handleImageChange = (e) => {
    setError('');
    selected = e.target.files[0];
    if (selected && selected.type.substr(0, 5) === "image") {
      if(selected.size > 6000000){setBigFile(true)}
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setUrl(reader.result);
      };
      reader.readAsDataURL(selected);
      setButtonText('Confirm')
    } 
    else {
      setError('File not supported');
    }
  };


  async function handleUpload() {
    setLoading(true)
    if(bigFile){
      setError('Pick a smaller size image');
      setLoading(false)
      return;
    }
    const bgColors = ["000D6B", "125C13", "3E065F", "082032", "FF414D"]
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`, 
      { profilePicture: url ? url : `https://ui-avatars.com/api/?name=${encodeURIComponent((currentUser.name))}&background=${bgColors[Math.floor(Math.random() * bgColors.length)]}&color=ffff`}, 
      { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
        setCurrentUser((oldValues) => {return {token: oldValues.token, ...res.data}})
        router.replace('/')
        }).catch((error)=>{
          setError(error.message)
          setLoading(false)
        })
  }

  return (
    !currentUser.profilePicture ?
    <div className = "h-screen flex flex-col items-center justify-center dark:bg-bdark-100">
      <div className = "mb-6 text-center">
        <h1 className = "mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">Finish Setting up your Account</h1>
      </div>
      <div className = "flex flex-col items-center mb-5">
        <h2  className = "text-lg text-gray-500 dark:text-gray-400 mb-3">Select A Profile Image</h2>
        <div className = "mb-3 h-48 w-48 border-2 dark:border-gray-400 border-gray-500 rounded-full relative overflow-hidden">
          <Image 
          src={imgPreview ? imgPreview : "campus-online/defaults/avatar_g92uxe.jpg"}
          layout='fill'
          className = "object-cover"
          />
        </div>
        <label className = "text-pink-500 hover:font-bold cursor-pointer">
          <input name = "profile-image" type = "file" accept = "image/*" className="hidden" onChange={handleImageChange}/>
          Select Image
        </label>
      </div>
      <div className = "flex flex-col items-center justify-center">
      {error && <p className="errorMsg">{error}</p>}
      <button disabled={loading} className = "infobutton" onClick = {handleUpload}>
        {loading ? <div className="loader mx-auto animate-spin"></div> : <>{buttonText}</>}
      </button>
      </div>
    </div>
    :
    <NotFound/>
  )
}

export default AddProfileImg