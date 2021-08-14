import Image from "next/image"
import Avatar from "../images/avatar.jpg"
import { useState } from "react";
import {auth, db, storage} from '../firebase/firebase';
import {getSession} from "next-auth/client";
import {useRouter} from 'next/router';
import NotAuthorized from "../components/notAuthorized";
import {useUser} from '../firebase/useUser';
import { mapUserInfo } from "../firebase/mapUserData";
import { setUserInfoCookie } from "../firebase/userCookies";

function add_profile_image({session}) {
    
  const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);
  var selected = null;
  var _file = null;
  const [url, setUrl] = useState();
  const router = useRouter();
  const {user} = useUser();


  const handleImageChange = (e) => {
    setError(false);
    selected = e.target.files[0];
    if (selected && selected.type.substr(0, 5) === "image") {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      resizeImage(selected)
    } 
    else {
      setError(true);
    }
  };

  function resizeImage(selected) {
    _file = selected
       if (_file) {
         var _reader = new FileReader();
   
   // Set the image for the FileReader
         _reader.onload = function (e) {
           var img = document.createElement("img");
           img.src = e.target.result;
   
   // Create your canvas
           var canvas = document.createElement("canvas");
           var ctx = canvas.getContext("2d");
           ctx.drawImage(img, 0, 0);
   
           var MAX_WIDTH = 120;
           var MAX_HEIGHT = 120;
           var width = img.width;
           var height = img.height;
   
   // Add the resizing logic
           if (width > height) {
             if (width > MAX_WIDTH) {
               height *= MAX_WIDTH / width;
               width = MAX_WIDTH;
             }
           } else {
             if (height > MAX_HEIGHT) {
               width *= MAX_HEIGHT / height;
               height = MAX_HEIGHT;
             }
           }
   
   //Specify the resizing result
           canvas.width = width;
           canvas.height = height;
           var ctx = canvas.getContext("2d");
           ctx.drawImage(img, 0, 0, width, height);
   
          setUrl(canvas.toDataURL(_file.type));

         };
         _reader.readAsDataURL(_file);
       }
    }

  async function handleUpload() {
    const docRef = db.collection('users').doc(user.id);
    await docRef.update({photoURL: url});
    const _userInfo = (await docRef.get()).data()
    const userInfo = mapUserInfo(_userInfo)
    setUserInfoCookie(userInfo)
    router.replace('/')
  }

    return (
      <main>
        {session && (
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
                <button className = "infobutton" onClick={()=> router.replace('/')}>Skip</button>
            )}
            {imgPreview && (
                <button className = "infobutton" onClick = {handleUpload}>Confirm</button>
            )}
            </div>
        </div>
        )}
        {!session && (
          <NotAuthorized/>
        )}
      </main>
    )
}

export async function getServerSideProps(context){
  //Get user
  const session = await getSession(context)
  return{
    props:{
      session
    }
  }
}
export default add_profile_image