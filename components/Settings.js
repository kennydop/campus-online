import SettingItems from "./SettingItems";
import {QuestionMarkCircleIcon, MoonIcon} from '@heroicons/react/solid';
import { useState } from "react";

function Settigs() {
    const [settings, setSettings] = useState(false);
    const showSettings = () => setSettings(!settings);

    return (
        // <div className={`top-0 fixed z-50 bg-green-500 md:w-102 h-screen w-full ${settings?'duration-300 right-0':'duration-700 -right-full'}`}>
        <div className="top-0 fixed z-50 bg-green-500 md:w-80 h-screen w-full right-0">
            <div onClick={showSettings}>Back</div>
            <SettingItems Icon={QuestionMarkCircleIcon} title ='Help and Support' onClick={showSettings}/>
            <SettingItems Icon={MoonIcon} title = 'Display Accessibilities' onClick={showSettings}/>
        </div>
    )
}
export default Settigs
