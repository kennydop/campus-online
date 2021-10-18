/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image"
import Avatar from "../images/avatar.jpg"
import { useState } from "react";
import { auth, storage } from '../firebase/firebase';
import {useRouter} from 'next/router';
import NotAuthorized from "../components/notAuthorized";
import { useAuth } from "../contexts/AuthContext";

function AddProfileImg() {
    
    const [imgPreview, setImgPreview] = useState(null);
    const [buttonText, setButtonText] = useState('Skip');
    const [bigFile, setBigFile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    var selected = null;
    var _file = null;
    const [url, setUrl] = useState();
    const router = useRouter();
    const { currentUser } = useAuth();
    const defaultProfileImage = 'https://i.pinimg.com/474x/01/6a/80/016a8077b311d3ece44fa4f5138c652d.jpg'


    const handleImageChange = (e) => {
        setError('');
        selected = e.target.files[0];
        if(selected.size > 6000000){setBigFile(true)}
        if (selected && selected.type.substr(0, 5) === "image") {
        let reader = new FileReader();
        reader.onloadend = () => {
            setImgPreview(reader.result);
        };
        reader.readAsDataURL(selected);
        resizeImage(selected)
        setButtonText('Confirm')
        } 
        else {
        setError('File not supported');
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
        setLoading(true)
        var urltp
        if(bigFile){
            setError('Pick a smaller size image');
            setLoading(false)
            return;
        }
        if(!url){
            urltp = defaultProfileImage;
                auth.currentUser.updateProfile({
                        photoURL: urltp
                    }).then(()=>{
                        router.replace('/addcollege')
                        }).catch((error)=>{
                            setError(error.message)
                            setLoading(false)
                            console.log(error)
                        })
        } else{
            urltp = url;
            const uploadTask = storage.ref(`profilePictures/${currentUser.uid}`).putString(urltp, 'data_url');
                uploadTask.on("state_change", null, (error) => setError(error.message),
                ()=> {
            // when the upload completes
                storage.ref('profilePictures').child(currentUser.uid).getDownloadURL().then(url => {
                    auth.currentUser.updateProfile({
                        photoURL: url
                    }).then(()=>{
                        router.replace('/addcollege')
                        }).catch((error)=>{
                            setError(error.message)
                            console.log(error)
                        })
                }).then(
                setLoading(false)
                )
            })
        }
        const uploadTask = storage.ref(`profilePictures/${currentUser.uid}`).putString(urltp, 'data_url');
                uploadTask.on("state_change", null, (error) => setError(error.message),
                ()=> {
            // when the upload completes
                storage.ref('profilePictures').child(currentUser.uid).getDownloadURL().then(url => {
                    auth.currentUser.updateProfile({
                        photoURL: url
                    }).then(()=>{
                        router.replace('/addcollege')
                        }).catch((error)=>{
                            setError(error.message)
                            console.log(error)
                        })
                }).then(
                setLoading(false)
                )
            })
    }

    return (
        currentUser ?
        <div className = "h-screen flex flex-col items-center justify-center dark:bg-bdark-100">
            <div className = "mb-6 text-center">
                <h1 className = "mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">Finish Setting up your Account</h1>
            </div>
            <div className = "flex flex-col items-center mb-5">
                <h2  onClick={()=>alert(url)} className = "text-lg text-gray-500 dark:text-gray-400 mb-3">Select A Profile Image</h2>
                <div className = "mb-3 h-48 w-48 border-2 dark:border-gray-400 border-gray-500 rounded-full relative overflow-hidden">
                    <Image 
                    src={imgPreview ? imgPreview : Avatar}
                    layout='fill'
                    className = "object-cover"
                    />
                </div>
                <label className = "text-pink-500 hover:font-bold cursor-pointer">
                    <input name = "profile-image" type = "file" accept = "image/*" className="hidden" onChange={handleImageChange}/>
                    Select Image
                </label>
            </div>
            <div className = "items-center">
            {error && <p className="errorMsg">{error}</p>}
            <button disadled={loading} className = "infobutton" onClick = {handleUpload}>
                {loading ? <div className="loader mx-auto animate-spin"></div> : <>{buttonText}</>}
            </button>
            </div>
        </div>
        :
        <NotAuthorized/>
    )
}

export default AddProfileImg