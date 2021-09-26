import Image from "next/image"
import campus_online_logo from "../images/campus-online-logo.png"
import {signOut, useSession} from "next-auth/client";
import { SearchIcon, HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { useRouter } from "next/router";
import { auth } from '../firebase/firebase'
import { useState } from "react";
import Profile from "./Profile";

function Header() {
    const [session] = useSession()
    const router = useRouter()
    const [settings, setSettings] = useState(false);
    const [profile, setProfile] = useState(false);
    const [tabActive, setTabActive] = useState('home')

    function logOut(){
            auth.signOut();
            signOut();
            router.replace('/Login')
    }

    return (
        <>
        <div className = "md:flex sticky top-0 z-50 bg-white justify-center items-center p-2 md:p-2.5 md:px-15 px-2 shadow-md">
                {/*left*/}
                <div className = "flex items-center pb-2 md:pb-0 px-2 md:px-0 mx-auto justify-between">
                    <div className="md:hidden flex text-center">
                        <img onClick = {()=> {setProfile(true); setTabActive('profile')}}
                            className = "h-8 w-8 avatar object-cover rounded-full cursor-pointer text-center"
                            src = {session.user.image}/>
                    </div>
                    <div className="flex items-center cursor-pointer px-4" href = "#">
                        <Image src = {campus_online_logo}
                        width = {138.24} 
                        height = {27.945} 
                        layout = "fixed"
                        alt = "campus online logo"/>
                    </div>
                    <div className="flex md:hidden items-center rounded-full bg-blue-grey-50 p-2">
                    <SearchIcon className = "h-5  cursor-pointer text-gray-500"/>
                    </div>
                </div>
                {/*centre*/}
                <div className = "hidden md:flex md:justify-center flex-grow">
                    <div className = "flex items-center rounded-full bg-blue-grey-50 p-1.5">
                            <SearchIcon className = "h-5 text-gray-500"/>
                            <input className = "hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500" type = "text" placeholder="Search"/>
                    </div>
                </div>
            {/*right*/}
            <div className = "hidden md:flex md:items-center md:justify-end">
                <div onClick={()=>{setSettings(false); setProfile(false); setTabActive('home')}}><HeaderIcon active = {tabActive === 'home'?true:undefined} Icon = {HomeIcon}/></div>
                <div onClick = {()=>setTabActive('global')}><HeaderIcon active = {tabActive === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
                <div onClick = {()=>setTabActive('notification')}><HeaderIcon active = {tabActive === 'notification'?true:undefined} Icon = {BellIcon}/></div>
                <div onClick = {()=>setTabActive('chat')}><HeaderIcon active = {tabActive === 'chat'?true:undefined} Icon = {ChatAlt2Icon}/></div>
                <div onClick = {()=>{setSettings(!settings); setTabActive('settings')}}><HeaderIcon Icon = {CogIcon}/></div>
                <div className = "hidden md:flex px-5 text-center">
                    <img onClick = {()=> {setProfile(true); setTabActive('profile')}}
                    className = "h-8 w-8 avatar object-cover rounded-full cursor-pointer"
                    src={session.user.image}/>
                </div>
        </div>
    </div>
    {settings &&
        <div>
            <Settings show={settings}/>
        </div>
    }
    {profile &&
            <div>
                <Profile show={profile}/>
            </div>
    }
    </>
    )
}


export default Header
