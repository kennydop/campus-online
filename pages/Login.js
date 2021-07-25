import Image from "next/image";
import campus_online_logo from "../images/campus-online-logo.png"

function Login() {
    return (
        <div className="flex">
            <div className = "hidden md:flex text-pink-500 w-1/2 h-full">
            </div>
            <div className="m-auto md:m-0 h-full">
                <div className="flex items-center justify-center my-auto mx-auto mb-3">
                        <Image src = {campus_online_logo}
                        width = {192} 
                        height = {34.5} 
                        layout = "fixed"
                        alt = "campus online logo"/>
                </div>
                <form className="flex flex-col">
                        <input className = "infofield" type = "text" placeholder = "Username"/>
                        <input className = "infofield" type = "password" placeholder = "Password"/>
                    <button className="bg-pink-500 text-white rounded-full h-12" type = 'submit'>Log In</button>
                </form>
                <p className="pt-1 m-auto text-gray-500 text-center">Not a User? <span className="text-pink-500 cursor-pointer">Sign Up</span></p>
            </div>

        </div>
    )
}

export default Login
