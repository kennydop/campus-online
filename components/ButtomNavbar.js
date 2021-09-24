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
            <div className = "flex items-center justify-center absolute space-evenly inset-x-0 z-50 bottom-0 border-t py-3 md:hidden bg-white">
                <div className='mx-auto'><HeaderIcon active Icon = {HomeIcon}/></div>
                <div className='mx-auto'><HeaderIcon Icon = {GlobeAltIcon}/></div>
                <div className='mx-auto'><HeaderIcon Icon = {BellIcon}/></div>
                <div className='mx-auto'><HeaderIcon Icon = {ChatAlt2Icon}/></div>
                <div className='mx-auto' onClick = {()=>setSettings(!settings)}><HeaderIcon Icon = {CogIcon}/></div>
            </div>
        </div>
        </>
    )
}

export default ButtomNavbar
