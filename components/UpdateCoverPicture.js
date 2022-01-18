import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useActiveTab } from "../contexts/ActiveTabContext";
import { defaultCoverPicture } from "../images/defaults"
import { XIcon } from "@heroicons/react/solid";

function UpdateCoverPicture({refreshUser, user}) {
  const { currentUser } = useAuth();
  const [bigFile, setBigFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Remove');
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState('');
  var selected = null;
  const [url, setUrl] = useState();
  const { setTabActive } = useActiveTab()


  const handleImageChange = (e) => {
    setError('');
    selected = e.target.files[0];
    if (selected && selected.type.substr(0, 5) === "image") {
      if(selected?.size > 7000000){setBigFile(true)}
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setUrl(reader.result)
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
    const img = url ? {coverPicture: url} : {removeCP: true}
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`, 
      img, 
      { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
        refreshUser();
        setTabActive("go back");
      }).catch((error)=>{
        setError(error.message)
        setLoading(false)
      })
  }

  return (
    <div className="flex flex-col justify-center items-center p-3 w-screen apfl md:apfc md:w-100 centered bg-blue-grey-50 dark:bg-bdark-200 md:bg-white md:dark:bg-bdark-100 md:rounded-lg shadow-md z-50">
      <div onClick={()=>{setTabActive('go back')}} className="absolute top-3 right-3 cursor-pointer"><XIcon className="h-5 text-red-500"/></div>
      <div className = "mb-3 w-full max-h-44 relative overflow-hidden">
          <img 
          src={imgPreview ? imgPreview : (user?.coverPicture ? user.coverPicture : defaultCoverPicture)}
          className = "object-cover w-full"
          />
        </div>
        <label className = "text-pink-500 hover:font-bold cursor-pointer my-3">
          <input name = "profile-image" type = "file" accept = "image/*" className="hidden" onChange={handleImageChange}/>
          Select Image
        </label>
      <div className = "flex flex-col items-center justify-center">
      {error && <p className="errorMsg">{error}</p>}
      <button disabled={(!user?.coverPicture && !imgPreview)|| loading} className = "infobutton-edit" onClick = {handleUpload}>
        {loading ? <div className="loader mx-auto animate-spin"></div> : <>{buttonText}</>}
      </button>
      </div>
    </div>
  )
}

export default UpdateCoverPicture
