import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useActiveTab } from "../contexts/ActiveTabContext";

function UpdateProfilePicture() {
  const { currentUser, setCurrentUser } = useAuth();
  const [bigFile, setBigFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Remove');
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState('');
  var selected = null;
  const [url, setUrl] = useState();
  const { prevTab, setTabActive } = useActiveTab()


  const handleImageChange = (e) => {
    setError('');
    selected = e.target.files[0];
    if (selected && selected.type.substr(0, 5) === "image") {
      if(selected?.size > 6000000){setBigFile(true)}
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
    const img = url ? {profilePicture: url} : {}
    axios.put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/users/${currentUser._id}`, 
      img, 
      { headers: { Authorization: `Bearer ${currentUser.token}`}, withCredentials: true, credentials: 'include'}).then((res)=>{
        setCurrentUser((oldValues) => {return {token: oldValues.token, ...res.data}})
        setTabActive(prevTab); 
        }).catch((error)=>{
          setError(error.message)
          setLoading(false)
        })
  }

  return (
    <div className="flex flex-col justify-center items-center p-3 w-screen apfl md:apfc md:w-100 centered bg-white dark:bg-bdark-100 md:rounded-lg shadow-md z-50">
      <div className = "mb-3 h-36 w-36 border-2 dark:border-gray-400 border-gray-500 rounded-full relative overflow-hidden">
          <img 
          src={imgPreview ? imgPreview : currentUser.profilePicture}
          className = "object-cover h-36 w-36"
          />
        </div>
        <label className = "text-pink-500 hover:font-bold cursor-pointer my-3">
          <input name = "profile-image" type = "file" accept = "image/*" className="hidden" onChange={handleImageChange}/>
          Select Image
        </label>
      <div className = "flex flex-col items-center justify-center">
      {error && <p className="errorMsg">{error}</p>}
      <button disabled={loading || (!imgPreview && currentUser.profilePicture.startsWith("https://ui-avatars.com/api/?name="))} className = "infobutton-edit" onClick = {handleUpload}>
        {loading ? <div className="loader mx-auto animate-spin"></div> : <>{buttonText}</>}
      </button>
      </div>
    </div>
  )
}

export default UpdateProfilePicture
