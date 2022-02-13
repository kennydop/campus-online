/* eslint-disable react/jsx-no-target-blank */
import { CheckCircleIcon, DuplicateIcon, MailIcon, XIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { useActiveTab } from "../contexts/ActiveTabContext"
import {fb_small, tt_small, msngr_small, wa_small} from "../images/defaults"

function Share({setShare, link, username}) {
  const { tabActive, setTabActive } = useActiveTab()
  const [copied, setCopied] = useState()
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer.php?u=${link}`, 
    whatsapp: `https://api.whatsapp.com/send?text=Check%20out%20this%20post%20by%20${username}%20on%20Campus%20Online ${link}`, 
    twitter: `https://twitter.com/share?url=${link}&text=Check%20out%20this%20post%20by%20${username}&via=CampusOnline_&hashtags=campusonline`, 
    email: `mailto:?subject=Check%20out%20this%20post&body=Check%20out%20this%20post%20by%20${username}%20on%20Campus%20Online%0A${link}`
  }

  const sharePost=(where)=>{

  }

  return (
    <div className="flex flex-col w-screen apfl md:apfc md:w-80 centered bg-white dark:bg-bdark-100 md:rounded-lg shadow-md overflow-hidden z-50">
      <div className="w-full p-3 border-b dark:border-bdark-200 text-gray-500 dark:text-gray-400 flex justify-between">
        <p className="font-semibold">Share to...</p>
        <div id="close_post" onClick={()=>{setShare(false); setTabActive(tabActive[tabActive.length-2]==='notification' ? tabActive[tabActive.length-3] : "go back")}}>
          <XIcon className="h-6 w-6 cursor-pointer"/>
        </div>
      </div>
      <div className="w-full">
        <a target="_blank" href={shareLinks.facebook} className="p-3 w-full text-gray-500 dark:text-gray-400 flex justify-start items-center space-x-2 hover:bg-gray-100 dark:hover:bg-bdark-200">
          {fb_small}
          <p>Share to Facebook</p>
        </a>
        <a target="_blank" href={shareLinks.whatsapp} className="p-3 w-full text-gray-500 dark:text-gray-400 flex justify-start items-center space-x-2 hover:bg-gray-100 dark:hover:bg-bdark-200">
          {wa_small}
          <p>Share to WhatsApp</p>
        </a>
        <a target="_blank" href={shareLinks.twitter} className="p-3 w-full text-gray-500 dark:text-gray-400 flex justify-start items-center space-x-2 hover:bg-gray-100 dark:hover:bg-bdark-200">
          {tt_small}
          <p>Share to Twitter</p>
        </a>
        <a target="_blank" href={shareLinks.email} className="p-3 w-full text-gray-500 dark:text-gray-400 flex justify-start items-center space-x-2 hover:bg-gray-100 dark:hover:bg-bdark-200">
          <MailIcon className="h-5"/>
          <p>Share via Email</p>
        </a>
        <div onClick={() => {if(copied) return; navigator.clipboard.writeText(link); setCopied(true)}} className="p-3 w-full text-gray-500 dark:text-gray-400 flex justify-start items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-bdark-200">
          {copied ? <CheckCircleIcon className="h-5"/> : <DuplicateIcon className="h-5"/>}
          <p>{copied ? 'Copied' : 'Copy Link'}</p>
        </div>
      </div>
    </div>
  )
}

export default Share
