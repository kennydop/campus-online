
import { auth } from "../firebase/firebase";
import { useState } from 'react';
import { useRouter } from 'next/router';
import AddCollege from "./addcollege";
import Feed from "./feed";
function Redirecting() {
    const [newbie, setNewbie] = useState()
    const router = useRouter();

    auth.getRedirectResult().then((res)=>{
        if(res.additionalUserInfo){
            if(res.additionalUserInfo.isNewUser){
                setNewbie(true)
            }
            else{
                setNewbie(false)
            }
        }
        })
    return (
        <>
        {newbie?router.replace('/addcollege'):router.replace('/')}
        </>
    )
}

export default Redirecting
