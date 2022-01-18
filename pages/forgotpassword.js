import { LockClosedIcon, UserIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({msg: " "});
  const router = useRouter()
  const { setCurrentUser } = useAuth()
  
  useEffect(()=>{
    if(router?.query.error==="1101"){
      setMsg({error: true, msg: "Link expired"})
    }
    else if(router?.query.error==="1103"){
      setMsg({error: true, msg: "Invalid Link"})
    }
  },[router.isReady, router.query.error])

  async function sendEmailAddress(e){
    e.preventDefault()
    setMsg(" ")
    if(e.target.elements.email.value.trim()==="") return
    setLoading(true)
    axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/auth/forgotpassword", {email: e.target.elements.email.value}).then((res)=>{
      setMsg(res.data)
      setLoading(false)
    })
  }
  
  async function resetPassword(e){
    e.preventDefault()
    setMsg(" ")
    if(e.target.elements.password.value.trim()==="") return
    setLoading(true)
    axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/auth/resetpassword/"+router.query.u, {password: e.target.elements.password.value}, {withCredentials: true, credentials: 'include'}).then((res)=>{
      if(res.data.token){
        setCurrentUser(res.data)
        router.replace("/")
      }
    })
  }

  return (
    router?.query.u ?
    <div className="w-screen flex flex-col items-center justify-center apfl md:apfc md:w-100 centered p-6 bg-white dark:bg-bdark-100 md:rounded-lg shadow-md dark:shadow-lg">
      <div className="text-gray-500 dark:text-gray-400 text-lg font-semibold mb-2">Forgot Password</div>
      <form className="flex flex-col items-center justify-center p-3" onSubmit={resetPassword}>
        <div>
          {msg && <p className = {`${msg.error ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'} text-sm text-center mb-2 w-full break-normal`}  id = "injectError">{msg.msg}</p>}
        </div>

        <div className="relative m-2">
          <LockClosedIcon className="infoicons"/>
          <input
          id="password"
          type="password"
          required={true}
          minLength="6"
          placeholder="Enter new password"
          autoComplete="new-password"
          className="infofield"
          title="password"
          />
        </div>
        <button disabled={loading} className="infobutton prevent-default m-2" type = "submit">
					{loading ? <div className="loader mx-auto animate-spin"></div> : <>Reset Password</>}
        </button>
      </form>
    </div>
    :
    <div className="w-screen flex flex-col items-center justify-center apfl md:apfc md:w-100 centered p-6 bg-white dark:bg-bdark-100 md:rounded-lg shadow-md dark:shadow-lg">
      <div className="text-gray-500 dark:text-gray-400 text-lg font-semibold mb-2">Forgot Password</div>
      <form className="flex flex-col items-center justify-center p-3" onSubmit={sendEmailAddress}>
        <div>
          {msg && <p className = {`${msg.error ? 'text-red-500' : (msg.email ? 'text-green-500' :'text-gray-500 dark:text-gray-400')} text-sm text-center mb-2 w-full break-normal`} id = "injectError">{msg.msg}</p>}
        </div>

        <div className="relative m-2">
          <UserIcon className="infoicons"/>
          <input
          id="email"
          required={true}
          placeholder="Enter email or username"
          autoComplete="email"
          className="infofield"
          title="example@example.com"
          />
        </div>
        <button disabled={loading} className="infobutton prevent-default m-2" type = "submit">
					{loading ? <div className="loader mx-auto animate-spin"></div> : <>Confirm</>}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
