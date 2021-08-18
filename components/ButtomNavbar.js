import HeaderIcon from "./HeaderIcon";
import { HomeIcon, BellIcon, ChatAlt2Icon, MenuIcon } from "@heroicons/react/outline";

function ButtomNavbar() {
    return (
        <div>
            <div className = "flex items-center justify-center absolute inset-x-0 bottom-0 border-t py-3 md:hidden">
                <HeaderIcon active Icon = {HomeIcon}/>
                <HeaderIcon Icon = {BellIcon}/>
                <HeaderIcon Icon = {ChatAlt2Icon}/>
                <HeaderIcon Icon = {MenuIcon}/>
            </div>
        </div>
    )
}

export default ButtomNavbar
