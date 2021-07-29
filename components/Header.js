import Image from "next/image"
import campus_online_logo from "../images/campus-online-logo.png"
import {
    BellIcon,
    ChatIcon,
    ChevronDownIcon,
    HomeIcon,
    UserGroupIcon,
    ViewGridIcon,
}from "@heroicons/react/solid";
import {
    FlagIEon,
    PlayIcon,
    SearchIcon,
    ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
    

function Header() {
    return (
        <div className = "md:flex sticky top-0 z-50 bg-white items-center p-2 md:px-15 px-2 shadow-sm">
                {/*left*/}
                <div className = "flex items-center pb-2 md:pb-0 px-2 md:px-0 mx-auto justify-between">
                    <div className="md:hidden">
                        <HeaderIcon Icon = {ViewGridIcon}/>
                    </div>
                    <div className="flex items-center">
                        <Image src = {campus_online_logo}
                        width = {192} 
                        height = {34.5} 
                        layout = "fixed"
                        alt = "campus online logo"/>
                    </div>
                    <div className="flex md:hidden items-center rounded-full bg-gray-100 p-2">
                    <SearchIcon className = "h-6 text-gray-500"/>
                    </div>
                </div>
                {/*centre*/}
                <div className = "hidden md:flex md:justify-center flex-grow">
                    <div className = "flex items-center rounded-full bg-gray-100 p-2">
                            <SearchIcon className = "h-3 sm:h-6 text-gray-500"/>
                            <input className = "hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500" type = "text" placeholder="Search"/>
                    </div>
                </div>
            {/*right*/}
            <div className = "flex items-center justify-center md:justify-end">
                <HeaderIcon active Icon = {HomeIcon}/>
                <HeaderIcon Icon = {BellIcon}/>
                <HeaderIcon Icon = {UserGroupIcon}/>
                <HeaderIcon Icon = {ChatIcon}/>
                <ViewGridIcon className = "hidden md:flex cursor-pointer h-6 px-2 md:px-3 text-center mx-auto text-gray-500 hover:text-pink-500"/>
            </div>
        </div>
    )
}

export default Header
