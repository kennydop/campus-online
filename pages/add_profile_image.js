import Image from "next/image"
import Avatar from "../images/avatar.jpg"
import { useState } from "react";

function add_profile_image() {

    // this.state={
    //     profileImg: Avatar
    // } 
    // imageHandler=(e)=>{
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //     if(reader.readyState === 2){
    //         this.setState({profileImg: reader.result})
    //     }
    //     reader.readAsDataURL(e.target.files[0])
    // }

    // const {profileImg} = this.state
    // }

    const [imgPreview, setImgPreview] = useState(null);
  const [error, setError] = useState(false);

  const handleImageChange = (e) => {
    setError(false);
    const selected = e.target.files[0];
    if (selected && selected.type.substr(0, 5) === "image") {
      let reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
      };
      reader.readAsDataURL(selected);
    } else {
      setError(true);
    }
  };
    return (
        <div className = "h-screen flex flex-col items-center justify-center">
            <div className = "mb-6 text-center">
                <h1 className = "mb-5 text-lg font-bold text-gray-500">Finish Setting up your Account</h1>
            </div>
            <div className = "flex flex-col items-center mb-5">
                <h2 className = "text-lg text-gray-500 mb-3">Select A Profile Image</h2>
                <div className = "mb-3 border-2 border-gray-500 rounded-full overflow-hidden">
                    <Image 
                    src={!imgPreview ? Avatar : imgPreview}
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
            {error && <p className="errorMsg text-red-500 font-bold text-center mb-2">File not supported</p>}
            {!imgPreview && (
                <button className = "infobutton">Skip</button>
            )}
            {imgPreview && (
                <button className = "infobutton">Confirm</button>
            )}
            </div>
        </div>
    )
}

export default add_profile_image
