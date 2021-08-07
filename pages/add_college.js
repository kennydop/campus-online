import {useRouter} from 'next/router'
import {db, auth} from '../firebase/firebase'
import { useState } from "react";


function add_college() {
    const router = useRouter();
    const [college, setCollege] = useState("");
    const uid = auth.currentUser.uid
    return (
        <div className = "h-screen flex flex-col items-center justify-center">
            <div className = "mb-10"><h1 className = "text-lg font-bold text-gray-500">Finish Setting up your Account</h1></div>
            <div className = "bg-gray-100 rounded-full space-between justify-center text-center">
                <label className = "text-gray-500 mx-4"> Select College:
                    <select value={college} onChange = {e=>setCollege(e.target.value)} name="college" required = "required" className = "bg-gray-100 text-gray-500 h-12 w-60 outline-none pl-5">
                        <option>Academic City College</option>
                        <option>Ashesi University</option>
                        <option>University of Cape Coast</option>
                        <option>University of Ghana</option>
                        <option>Kwame Nkrumah University of Science and Technology</option>
                    </select>
                </label>
            </div>
            <div className = "mt-6">
             <button type = "button" className = "infobutton" onClick={()=>{router.push('/add_profile_image'); db.collection("users").doc(uid).set({college: college})}}>Confirm</button>
            </div>
        </div>
    )
}

export default add_college
