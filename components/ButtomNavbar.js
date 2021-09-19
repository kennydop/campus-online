import HeaderIcon from "./HeaderIcon";
import Settings from "../components/Settings"
import { HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useState } from "react";

function ButtomNavbar() {
    const [settings, setSettings] = useState(false);
    const handleActiveButton=()=>{

    }
    return (
        <>
        {settings &&
        <div>
            <Settings show={settings}/>
        </div>
        }
        <div>
            <div className = "flex items-center justify-center absolute inset-x-0 z-50 bottom-0 border-t py-3 md:hidden bg-white">
                <div><HeaderIcon active Icon = {HomeIcon}/></div>
                <div><HeaderIcon Icon = {GlobeAltIcon}/></div>
                <div><HeaderIcon Icon = {BellIcon}/></div>
                <div><HeaderIcon Icon = {ChatAlt2Icon}/></div>
                <div onClick = {()=>setSettings(!settings)}><HeaderIcon Icon = {CogIcon}/></div>
            </div>
        </div>
        </>
    )
}

export default ButtomNavbar
