import Image from "next/image";
import Avatar from "../images/avatar.jpg";
import { useState } from "react";
import {auth, storage} from '../firebase/firebase';
import {useSession} from "next-auth/client";
import {useRouter} from 'next/router';

function add_profile_image() {

  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [url, setURL] = useState("");
  const [session] = useSession();
  const router = useRouter();

  const handleImageChange = (e) => {
    setError(false);
    setSelected(e.target.files[0]);
    if (selected && selected.type.substr(0, 5) === "image") {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };

  function handleUpload() {
    const ref = storage.ref(`/avatars/${selected.name}`);
    const uploadTask = ref.put(selected);
    uploadTask.on("state_changed", () => {
      ref
        .getDownloadURL()
        .then((url) => {
          setSelected(null);
          setURL(url);
        });
      });
      alert(url);
    auth.currentUser.updateProfile(photoURL = url)
    
    session.user.image = url;
    
    router.push('/')
  }
    return (
        <div className = "h-screen flex flex-col items-center justify-center">
            <div className = "mb-6 text-center">
                <h1 className = "mb-5 text-lg font-bold text-gray-500">Finish Setting up your Account</h1>
            </div>
            <div className = "flex flex-col items-center mb-5">
                <h2 className = "text-lg text-gray-500 mb-3">Select A Profile Image</h2>
                <div className = "mb-3 border-2 border-gray-500 rounded-full overflow-hidden">
                    <Image 
                    src={imgPreview ? imgPreview : Avatar}
                    width={180}
                    height={180}
                    className = "object-cover"
                    />
                </div>
                <label className = "text-pink-500 hover:font-bold cursor-pointer">
                    <input name = "profile-image" type = "file" accept = "image/*" className="hidden" onChange={handleImageChange}/>
                    Select Image
                </label>
            </div>
            <div className = "items-center">
            {error && <p className="errorMsg">File not supported</p>}
            {!imgPreview && (
                <button className = "infobutton">Skip</button>
            )}
            {imgPreview && (
                <button className = "infobutton" onClick = {handleUpload}>Confirm</button>
            )}
            </div>
        </div>
    )
}

export default add_profile_image
