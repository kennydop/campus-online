import Image from "next/image";
import campus_online_logo from "../images/campus-online-logo.png";
import { MailIcon, LockClosedIcon} from "@heroicons/react/outline";
import {signIn, signOut, useSession} from "next-auth/client";
import Campusonline from './campusonline';
import Link from 'next/link'
import { auth } from "../firebase/firebase";
import { useState } from "react";

function Login() {
  const [session, loading] = useSession();
  const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [photoUrl, setPhotoUrl] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);

  async function loginToApp(){
    setError('')
    if(!email){
      setError("Please enter your Email");
    }
    else if(!password){
      setError("Please enter a Password");
    }else{
      let goAhead = await auth.signInWithEmailAndPassword(email, password).then((userAuth)=>{
        // setName(userAuth.user.displayName);
        // setPhotoUrl(userAuth.user.photoURL);
        return userAuth.user;
      }).catch((error)=> {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('Account not found')
            break;
          case 'auth/wrong-password':
            setError('Invalid password')
            break;
        
          default:
            setError(error.message)
            console.log(error)
            break;
        }
      })
        
      goAhead &&  await signIn('credentials', {username: goAhead.displayName, email: email, password: password, photoURL: goAhead.photoURL, callbackUrl: 'http://localhost:3000/'})
    }
  }
  
    return (
        <main>
          {!session && (
            <div className="w-screen flex flex-col justify-center items-center bg-blue-grey-50">
              <div className = "flex h-screen self-center">
                <div className = 'self-center'>
                <form autoComplete='on' className="authForm">
                <div className="mb-6" >
                <Image 
                  src={campus_online_logo}
                  width = {192} 
                  height = {34.5} 
                  layout = "fixed"
                  onClick = {signOut}
                  alt = "campus online logo"/>
                </div>
                {error && <p className = "errorMsg" id = "injectError">{error}</p>}
                <div className="relative">
                  <MailIcon className="infoicons"/>
                  <input
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    autoComplete="email"
                    className="infofield"
                  />
                </div>
                <div className="relative">
                  <LockClosedIcon className="infoicons"/>
                  <input
                    value={password}
                    onChange={e=> setpassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="infofield"
                  />
                </div>
                <a href="#" className="self-center mb-1 text-sm text-gray-500 hover:font-bold">Forgot password?</a>
                <p className="self-center mb-6 text-sm text-gray-500">Don't have an account? <a className = "text-pink-500 hover:font-bold"> <Link href = "/Signup">Create one</Link></a></p>
                <button className="infobutton" type = "button" onClick = {loginToApp}>Login</button>
                <div className = "flex flex-col mt-5 items-center justify center">
                  <p className = "self-center text-gray-500"> Or Login with</p>
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
                <nav className="flex flex-row flex-wrap justify-center items-center">
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
          )}
          {
            session && (
              <Campusonline />
            )
          }
        
        </main>
    )
}

export default Login