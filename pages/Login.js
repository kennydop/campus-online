/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import campus_online_logo from "../images/campus-online-logo.png";
import { MailIcon, LockClosedIcon} from "@heroicons/react/outline";
import AuthLeft from '../components/AuthLeft'
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../firebase/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const { currentUser, loginWithProvider, login } = useAuth()

  async function loginWithEmail(){
    setError('');
    setLoginLoading(true);
    if(!email){
      setError("Please enter your Email");
      setLoginLoading(false);
    }
    else if(!password){
      setError("Please enter a Password");
      setLoginLoading(false);
    }else{
      try{
        await login(email, password)
        router.replace('/')
      }
      catch(error){
        switch (error.code) {
          case 'auth/user-not-found':
            setError('Account not found')
            break;
          case 'auth/wrong-password':
            setError('Invalid password')
            break;
          case 'auth/network-request-failed':
            setError('Please check your internet connection')
            break;
          case "auth/invalid-email":
            setError('Invalid Email')
            break;
          default:
            setError('Unable to login, try again please')
            console.log(error)
            break;
        }
      }
      setLoginLoading(false);
    }
  }

  async function loginWithSocials(pvd){
    try{
      router.replace('/')
      await loginWithProvider(pvd)
    }catch(error){
      switch (error.code) {
        case 'auth/network-request-failed':
          setError('Please check your internet connection')
          break;
        default:
          setError('Unable to login, try again please')
          console.log(error)
          break;
      }
    }
  }
    return (
        <main>
          {!currentUser && (
            <div className="w-screen flex justify-center items-center bg-blue-grey-50 dark:bg-bdark-200">
              <AuthLeft/>
              <div className = "flex h-screen self-center w-screen lg:w-2/5 items-center justify-center bg-white dark:bg-bdark-100 lg:bg-transparent dark:lg:bg-transparent">
                  <form autoComplete='on' className="authForm">
                  <div className="mb-6" >
                  <Image 
                    src={campus_online_logo}
                    width = {192} 
                    height = {34.5} 
                    layout = "fixed"
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
                  <a href="#" className="self-center mb-1 text-sm text-gray-500 dark:text-gray-400 hover:font-bold">Forgot password?</a>
                  <p className="self-center mb-6 text-sm text-gray-500 dark:text-gray-400">Don't have an account? <a className = "text-pink-500 hover:font-bold cursor-pointer" onClick={()=> router.push("/Signup")}>Create one</a></p>
                  <button disabled = {loginLoading} className="infobutton" type = "button" onClick = {loginWithEmail}>
                    {loginLoading ? <div className="loader mx-auto animate-spin"></div> : <>Login</>}
                  </button>
                  <div className = "flex flex-col mt-5 items-center justify center">
                    <p className = "self-center text-gray-500 dark:text-gray-400"> Or Login with</p>
                    <div className = "flex items-center justify center">
                      <div className="mx-4 cursor-pointer hover:translate-y-0.5 transform transition-all duration-500;" onClick={() => loginWithSocials("facebook")}>
                        <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
                      </div>
                      <div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => loginWithSocials("twitter")}>
                      <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48" viewBox="-44.7006 -60.54775 387.4052 363.2865"><path fill="#1da1f2" d="M93.719 242.19c112.46 0 173.96-93.168 173.96-173.96 0-2.646-.054-5.28-.173-7.903a124.338 124.338 0 0030.498-31.66c-10.955 4.87-22.744 8.148-35.11 9.626 12.622-7.57 22.313-19.543 26.885-33.817a122.62 122.62 0 01-38.824 14.841C239.798 7.433 223.915 0 206.326 0c-33.764 0-61.144 27.381-61.144 61.132 0 4.798.537 9.465 1.586 13.941-50.815-2.557-95.874-26.886-126.03-63.88a60.977 60.977 0 00-8.279 30.73c0 21.212 10.794 39.938 27.208 50.893a60.685 60.685 0 01-27.69-7.647c-.009.257-.009.507-.009.781 0 29.61 21.075 54.332 49.051 59.934a61.218 61.218 0 01-16.122 2.152 60.84 60.84 0 01-11.491-1.103c7.784 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.798-.28-14.584-.846 27.059 17.344 59.189 27.464 93.722 27.464"/></svg>
                      </div>
                      <div className="mx-4 cursor-pointer hover:translate-y-1 transform transition-all duration-500;" onClick={() => loginWithSocials("google")}>
                      <img src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
          </div>
          )}
          {
            currentUser && (
              router.replace('/')
            )
          }
        </main>
    )
}

export default Login