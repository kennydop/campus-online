function Login() {
    return (
        <div className="flex">
            <div className = "text-pink-500 w-1/2 h-full">
            </div>
            <div>
                <h1 className="p-3 text-gray-500">Login</h1>
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
