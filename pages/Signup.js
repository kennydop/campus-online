import Image from "next/image";
import { useState } from "react";
import campus_online_logo from "../images/campus-online-logo.png";
import { UserIcon, MailIcon, LockClosedIcon, PhotographIcon} from "@heroicons/react/outline";
import Link from 'next/link';
import { auth } from "../firebase/firebase";
import {signIn, signOut, useSession} from "next-auth/client";
import { setUserCookie } from '../firebase/userCookies';
import { mapUserData } from '../firebase/mapUserData';


function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState(false);
    const [session, loading] = useSession();
    const defaultProfileImage = 'https://i.pinimg.com/474x/01/6a/80/016a8077b311d3ece44fa4f5138c652d.jpg'
    var pp = "";

    async function register () {
        setError('');
        if(session){
            setError('Please log out first')
        }
        else if(!name){
            setError("Please enter a Username");
        }
        else if(!email){
            setError("Please enter your Email");
        }
        else if(!password){
            setError("Please enter a Password");
        }
        else{
            if(photoUrl === ''){
                pp = defaultProfileImage
            }
            else{
                pp = photoUrl
            }
            console.log(pp)
            let goAhead = await auth.createUserWithEmailAndPassword(email, password).then((userAuth)=>{
                                    userAuth.user.updateProfile({
                                        displayName: name,
                                        photoURL: pp
                                    })
                                    const userData = mapUserData(userAuth.user);
                                    setUserCookie(userData);
                                    return userAuth;
                                }).catch((error)=> {setError(error.message)})
                                    
            goAhead && await signIn('credentials', {email: email, username: name, password: password, photoURL: pp, callbackUrl: 'http://localhost:3000/AddCollege'})
        }

    }
    return (
    <div className="w-screen flex flex-col justify-center items-center bg-blue-grey-50">
        <div className = "flex self-center h-screen mt-4 mb-6">
            <div className = 'self-center'>
            <form autoComplete='on' className="authForm">
                <div className="mb-4" >
                    <Image 
                        src={campus_online_logo}
                        width = {192} 
                        height = {34.5} 
                        layout = "fixed"
                        onClick = {signOut}
                        alt = "campus online logo"/>
                </div>
                {error && <p className = "errorMsg" id = "injectError">{error}</p>}
                <div>
                    <UserIcon className="infoicons"/>
                    <input
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    type="text"
                    placeholder="Create Username"
                    autoComplete="name"
                    className="infofield"
                    />
                </div>
                <div>
                    <MailIcon className="infoicons"/>
                    <input
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    type="text"
                    placeholder="Enter Email"
                    autoComplete="email"
                    className="infofield"
                    />
                </div>
                <div>
                    <LockClosedIcon className="infoicons"/>
                    <input
                    value={password}
                    onChange={e=> setpassword(e.target.value)}
                    type="password"
                    placeholder="Create Password"
                    autoComplete="new-password"
                    className="infofield"/>
                </div>
                <div>
                    <PhotographIcon className="infoicons"/>
                    <input
                    value={photoUrl}
                    onChange={e=> setPhotoUrl(e.target.value)}
                    type="text"
                    placeholder="Profile Photo URL"
                    className="infofield"/>
                </div>
                <p className="self-center mb-6 text-sm text-gray-500">Already have an account? <a className = "text-pink-500 hover:font-bold"> <Link href="/Login">Login</Link></a></p>
                <button className="infobutton prevent-default" type = "button" onClick={register}>Sign Up</button>
                <div className = "flex flex-col mt-5 items-center justify center">
                    <p className = "self-center text-gray-500"> Or Signup with</p>
                    <div className = "flex items-center justify center">
                        <div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => signIn("facebook")}>
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
                        </div>
                        <div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => signIn("twitter")}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="-44.7006 -60.54775 387.4052 363.2865"><path fill="#1da1f2" d="M93.719 242.19c112.46 0 173.96-93.168 173.96-173.96 0-2.646-.054-5.28-.173-7.903a124.338 124.338 0 0030.498-31.66c-10.955 4.87-22.744 8.148-35.11 9.626 12.622-7.57 22.313-19.543 26.885-33.817a122.62 122.62 0 01-38.824 14.841C239.798 7.433 223.915 0 206.326 0c-33.764 0-61.144 27.381-61.144 61.132 0 4.798.537 9.465 1.586 13.941-50.815-2.557-95.874-26.886-126.03-63.88a60.977 60.977 0 00-8.279 30.73c0 21.212 10.794 39.938 27.208 50.893a60.685 60.685 0 01-27.69-7.647c-.009.257-.009.507-.009.781 0 29.61 21.075 54.332 49.051 59.934a61.218 61.218 0 01-16.122 2.152 60.84 60.84 0 01-11.491-1.103c7.784 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.798-.28-14.584-.846 27.059 17.344 59.189 27.464 93.722 27.464"/></svg>
                        </div>
                        <div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => signIn("google")}>
                            <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </div>
        <div>
            <nav className="flex flex-row flex-wrap justify-center items-center ">
                <a className = "text-gray-500 mx-3 my-1 text-sm" href="#">About</a>
                <a className = "text-gray-500 mx-3 my-1 text-sm" href="#">Help</a>
                <a className = "text-gray-500 mx-3 my-1 text-sm" href="#">Terms Of Service</a>
                <a className = "text-gray-500 mx-3 my-1 text-sm" href="#">Privacy Policy</a>
                <a className = "text-gray-500 mx-3 my-1 text-sm" href="#">Cookie Policy</a>
                <a className = "text-gray-500 mx-3 my-1 text-sm" href="#">Settings</a>
            </nav>
            <div className = "text-center text-gray-500 text-sm mb-2">&copy; 2021 Trayl, Inc.</div>
        </div>
    </div>
    )
}

export default Signup