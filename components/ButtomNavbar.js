import HeaderIcon from "./HeaderIcon";
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";

function ButtomNavbar() {
    return (
        <div>
            <div className = "flex items-center justify-center absolute inset-x-0 z-50 bottom-0 border-t py-3 md:hidden bg-white">
                <HeaderIcon active Icon = {HomeIcon}/>
                <HeaderIcon Icon = {BellIcon}/>
                <HeaderIcon Icon = {ChatAlt2Icon}/>
                <HeaderIcon Icon = {CogIcon}/>
            </div>
        </div>
    )
}

export default ButtomNavbar
