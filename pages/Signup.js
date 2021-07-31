import Image from "next/image";
import campus_online_logo from "../images/campus-online-logo.png";
import profilePic from "../images/IMG_8569.jpg";
import { PlusSmIcon } from "@heroicons/react/outline";

function Signup() {
    return (
    <div className="w-screen flex flex-col justify-center items-center">
        <div className = "flex self-center h-full">
          <form className="flex flex-col justify-center items-center">
            <div className="mt-4 mb-1" >
                <Image 
                    src={campus_online_logo}
                    width = {192} 
                    height = {34.5} 
                    layout = "fixed"
                    alt = "campus online logo"/>
            </div>
            <p className = "mb-4 text-lg font-bold text-gray-500">Create an Account</p>
            <div>
                <input
                type="text"
                placeholder="Create Username"
                className="infofield"
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Create Password"
                    className="infofield"/>
            </div>
            <div className = "bg-gray-100 rounded-full mb-5 space-between">
                <label className = "text-gray-500 mx-4"> Gender:
                    <select name="gender" required = "required" className = "bg-gray-100 text-gray-500 h-12 outline-none pl-5">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </label>
            </div>
            <div className = "profilePic">
                <input type = "file" className = "addProfilePic"> </input>
            </div>
            <a href="#" className="self-center mb-1 text-sm text-gray-500 hover:font-bold">Forgot Create Password?</a>
            <p className="self-center mb-6 text-sm text-gray-500">Already have an account? <a href="#" className = "text-pink-500 hover:font-bold">Login</a></p>
            <button className="infobutton" type = "submit">Sign Up</button>
            <div className = "flex my-5 items-center justify center">
                <div className="mx-4">
                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/></svg>
                </div>
                <div className="mx-4">
                    <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" height="60" width="120" viewBox="-40.446 -22.19 350.532 133.14"><path d="M115.39 46.71c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.86 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/><path d="M163.39 46.71c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/><path d="M209.39 25.87v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/><path d="M224.64 2.53v65h-9.5v-65z" fill="#34A853"/><path d="M261.66 54.01l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/><path d="M34.93 40.94v-9.41h31.71c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C15.96 68.88 0 53.42 0 34.44 0 15.46 15.96 0 34.94 0c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65z" fill="#4285F4"/></svg>
                </div>
            </div>
            </form>
            </div>
            <div>
            <nav className="flex flex-row flex-wrap justify-center items-center">
                <a className = "text-gray-500 px-3 py-1 text-sm" href="#">About</a>
                <a className = "text-gray-500 px-3 py-1 text-sm" href="#">Help</a>
                <a className = "text-gray-500 px-3 py-1 text-sm" href="#">Terms Of Service</a>
                <a className = "text-gray-500 px-3 py-1 text-sm" href="#">Privacy Policy</a>
                <a className = "text-gray-500 px-3 py-1 text-sm" href="#">Cookie Policy</a>
                <a className = "text-gray-500 px-3 py-1 text-sm" href="#">Settings</a>
            </nav>
            <div className = "text-center text-gray-500 text-sm">&copy; 2021 Trayl, Inc.</div>
        </div>
    </div>
    )
}

export default Signup
