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
        <div>
            {/*left*/}
            <div className="flex items-center">
                <Image src = {campus_online_logo}
                width = {192} 
                height = {34.5} 
                layout = "fixed"/>
            </div>
            {/*centre*/}
            <div className = "flex justify-center flex-grow">
                <div className = "flex items-center rounded-full bg-gray-100 p-2">
                        <SearchIcon className = "h-6 text-gray-600"/>
                        <input className = "flex ml-2 items-center bg-transparent outline-none placeholder-gray-500"type = "text" placeholder="Search"/>
                </div>
            </div>
            {/*right*/}
            <div>
                <HeaderIcon Icon = {HomeIcon }/>
            </div>
        </div>
    )
}

export default Header
