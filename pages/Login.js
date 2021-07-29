function Login() {
    return (
<div>
    <div className="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
      <img src="../images/campus-online-login-left-side-image.jpg" className="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"/>
      <form className=" pr-5 md:pr-0 flex flex-col justify-center items-center w-1/2">
        <img src="../images/campus-online-logo.png" className="w-192" />
        <div className="relative">
          <i className="fa fa-user absolute text-primarycolor text-xl"></i>
          <input
            type="text"
            placeholder="Username"
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
          />
        </div>
        <div className="relative mt-8">
          <i className="fa fa-lock absolute text-primarycolor text-xl"></i>
          <input
            type="password"
            placeholder="Password"
            className="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-lg"
          />
        </div>
        <a href="#" className="self-center mt-4 text-gray-500">Forgot password?</a>
        <a href="#" className="py-3 px-20 bg-pink-500 rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500">Login</a>
      </form>
    </div>
  </div>

    )
}

export default Login
