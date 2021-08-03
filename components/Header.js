import Image from "next/image"
import campus_online_logo from "../images/campus-online-logo.png"
import {session, signOut, useSession} from "next-auth/client";

import {
    SearchIcon,
    UserCircleIcon,
    HomeIcon,
    BellIcon,
    ChatAlt2Icon,
    UserGroupIcon,
} from "@heroicons/react/outline";

import HeaderIcon from "./HeaderIcon";
    

function Header() {
const [session] = useSession();

    return (
        <div className = "md:flex sticky top-0 z-50 bg-white items-center p-3 md:px-15 px-2 shadow-sm">
                {/*left*/}
                <div className = "flex items-center pb-2 md:pb-0 px-2 md:px-0 mx-auto justify-between">
                    <div className="md:hidden">
                        <Image onClick = {signOut}
                            className = "rounded-full cursor-pointer px-2 text-center"
                            src = {session.user.image}
                            width={32}
                            height={32}
                            layout="fixed"/>
                    </div>
                    <div className="flex items-center cursor-pointer" href = "#">
                        <Image src = {campus_online_logo}
                        width = {192} 
                        height = {34.5} 
                        layout = "fixed"
                        alt = "campus online logo"/>
                    </div>
                    <div className="flex md:hidden items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className = "h-5 text-gray-500 cursor-pointer"/>
                    </div>
                </div>
                {/*centre*/}
                <div className = "hidden md:flex md:justify-center flex-grow">
                    <div className = "flex items-center rounded-full bg-gray-100 p-1.5">
                            <SearchIcon className = "h-3 sm:h-5 text-gray-500"/>
                            <input className = "hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500" type = "text" placeholder="Search"/>
                    </div>
                </div>
            {/*right*/}
            <div className = "flex items-center justify-center md:justify-end">
                <HeaderIcon active Icon = {HomeIcon}/>
                <HeaderIcon Icon = {UserGroupIcon}/>
                <HeaderIcon Icon = {BellIcon}/>
                <HeaderIcon Icon = {ChatAlt2Icon}/>
                <div className = "hidden md:flex px-5 text-center">
                    <Image onClick = {signOut}
                    className = "rounded-full cursor-pointer"
                    src = {session.user.image}
                    width={32}
                    height={32}
                    layout="fixed"/>
                </div>
                {/* <UserCircleIcon className = "hidden md:flex cursor-pointer h-6 px-2 md:px-3 text-center mx-auto text-gray-500 hover:text-pink-500" onClick={() => signOut()}/> */}
        </div>
    </div>
    )
}

export default Header
