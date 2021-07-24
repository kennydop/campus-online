import Image from "next/image";
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
        <div className = "md:flex sticky top-0 z-50 bg-white items-center p-2 shadow-sm">
            <div className="sm:flex sm:items-center">
                {/*left*/}
                <div className="flex items-center">
                    <Image src = {campus_online_logo}
                    width = {192} 
                    height = {34.5} 
                    layout = "fixed"/>
                </div>
                {/*centre*/}
                <div className = "flex md:justify-center md:flex-grow">
                    <div className = "flex items-center rounded-full bg-gray-100 p-2">
                            <SearchIcon className = "sm:h-6 md:h-6 text-gray-400"/>
                            <input className = "hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500" type = "text" placeholder="Search"/>
                    </div>
                </div>
            </div>
            {/*right*/}
            <div className = "flex items-center md:justify-end">
                <HeaderIcon active Icon = {HomeIcon}/>
                <HeaderIcon Icon = {BellIcon}/>
                <HeaderIcon Icon = {ChatIcon}/>
            </div>
        </div>
    )
}

export default Header
