/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { SearchIcon, HomeIcon, BellIcon, ChatAlt2Icon, CogIcon, GlobeAltIcon, PlusCircleIcon, UserCircleIcon} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useEffect, useState, useRef } from "react";
import NotificationPane from "./NotificationPane";
import { useRouter } from 'next/router';
import { useAuth } from "../contexts/AuthContext";
import { useActiveTab } from "../contexts/ActiveTabContext";
import Link from "next/link";
import PostDialog from "./PostDialog";
import { useOnClickOutside } from "./Hooks";
import DeleteAccountDialog from "./DeleteAccountDialog";
import SearchContainer from "./SearchContainer";
import axios from "axios";
import { useUtils } from "../contexts/UtilsContext";

function Header() {
  const { tabActive, setTabActive } = useActiveTab()
  const { currentUser, logout } = useAuth();
  const [enterSearchMode, setEnterSearchMode] = useState(false);
  const [showAccMenu, setShowAccMenu] = useState(false);
  const [showMinAccMenu, setShowMinAccMenu] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const router = useRouter();
  const accRef = useRef();
  const minAccRef = useRef();
  const { unreadNotifications, unreadChats, newPosts, setRefreshFeedPosts, setRefreshGlobalPosts, refreshFeedPosts, refreshGlobalPosts, setFeedScroll, setGlobalScroll } = useUtils();

  useOnClickOutside(accRef, () =>setShowAccMenu(false))
  useOnClickOutside(minAccRef, () =>setShowMinAccMenu(false))

  useEffect(()=>{
    if(tabActive[tabActive.length - 1].slice(0,4) === "post" || tabActive[tabActive.length - 1]==='updatePP'  || tabActive[tabActive.length - 1]==='updateCI' || tabActive[tabActive.length - 1]==='notification' || tabActive[tabActive.length - 1]==='delAcc' || tabActive[tabActive.length - 1]==='share' || tabActive[tabActive.length - 1]==='fflist' || enterSearchMode){
      document.body.classList.add('lg:mr-4')
      document.body.classList.add('overflow-hidden')
    }else{
      document.body.classList.remove('overflow-hidden')
      document.body.classList.remove('lg:mr-4')
    }
    enterSearchMode && document.querySelector("#minSearch").focus()
  },[tabActive, enterSearchMode])
    
  function handleHome(){
    if(typeof window === 'object' && router.pathname === '/feed'){
      window.scrollTo({top: 0, behavior: 'smooth'})
      newPosts > 0 && setRefreshFeedPosts(true)
    }else{
      memorizeScrollPosition()
      router.push('/feed');
    }
    setTabActive('home')
  }
    
  function handleGlobal(){
    if(typeof window === 'object' && router.pathname === '/global'){
      window.scrollTo({top: 0, behavior: 'smooth'})
    }else{
      memorizeScrollPosition()
      router.push('/global');
    }
    setTabActive('global')
  }

  function memorizeScrollPosition(){
    if(router.pathname === '/feed'){
      setFeedScroll(window.scrollY)
    }else if(router.pathname === '/global'){
      setGlobalScroll(window.scrollY)
    }
  }

  async function search(e){
    if(e.target.value.trim()===""){
      setSearchRes([])
      return
    }
    axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users?search="+e.target.value.trim()).then((res)=>{
      setSearchRes(res.data)
    })
  }

  function clearSearch(){
    const i = document.activeElement === document.querySelector("#minSearch")
    if(enterSearchMode && i) return
    setSearchRes([])
    setEnterSearchMode(false)
  }

  return (
    <>
      <div className = {`md:flex sticky inset-x-0 top-0 z-50 bg-white dark:bg-bdark-100 justify-center items-center p-2 md:p-2.5 md:px-15 px-2 shadow-md ${tabActive[tabActive.length - 1]==='chat' && 'hidden md:block'}`}>
        {/*left*/}
        <div className = "flex items-center md:pb-0 px-2 md:px-0 mx-auto justify-between">
          {currentUser && <div className="md:hidden flex text-center">
            <img onClick={()=>{setShowMinAccMenu(true)}}
              className = {`h-7 w-7 avatar object-cover rounded-full cursor-pointer text-center ${tabActive[tabActive.length-1]==='profile' ? 'border-2 border-pink-500': ''}`}
              src = {currentUser.profilePicture}/>
              {showMinAccMenu && <div ref={minAccRef} className="absolute w-48 bg-white dark:bg-bdark-100 border dark:border-bdark-200 shadow-all dark:shadow-all-lg top-11 rounded-lg overflow-hidden">
              <Link href={`/u/${currentUser.username}`} passHref>
                <div onClick={()=> {memorizeScrollPosition(); setTabActive('profile'); setShowMinAccMenu(false)}} className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-2 space-x-2">
                  <UserCircleIcon className="h-5 w-5"/>
                  <p>Profile</p>
                </div>
              </Link>
              <div onClick={()=>{memorizeScrollPosition(); setTabActive('settings'); setShowMinAccMenu(false); router.push('/settings')}} className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-2 space-x-2">
                <CogIcon className="h-5 w-5"/>
                <p>Settings</p>
              </div>
              <div onClick={()=>logout()} className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-2 space-x-2 border-t border-gray-300 dark:border-bdark-200">
                <p>Log Out</p>
              </div>
            </div>}
            </div>}
            <div onClick={()=>{router.push('/'); setTabActive('home')}} className="flex items-center cursor-pointer md:ml-8 lg:ml-16 ml-0 flex-shrink" href = "/">
              <svg xmlns="http://www.w3.org/2000/svg" width="137.426" height="26.357" viewBox="0 0 137.426 26.357">
                <path id="Exclusion_1" data-name="Exclusion 1" d="M56,25.357H-6a4,4,0,0,1-4-4V3A4,4,0,0,1-6-1H56a4,4,0,0,1,4,4V21.357A4,4,0,0,1,56,25.357Zm-2.551-9.138a.357.357,0,0,0-.3.176,2.108,2.108,0,0,1-.838.9c-.193.125-.287.236-.287.339a.233.233,0,0,0,.044.166,2.086,2.086,0,0,0,.2.154,1.727,1.727,0,0,1,.49.342,2.966,2.966,0,0,1,.347.529.427.427,0,0,0,.342.232c.109,0,.216-.085.318-.254a2.069,2.069,0,0,1,.864-.85.322.322,0,0,0,.186-.275.317.317,0,0,0-.039-.176.64.64,0,0,0-.235-.142,2.468,2.468,0,0,1-.712-.712.618.618,0,0,0-.1-.251A.312.312,0,0,0,53.449,16.219ZM2.9,4.178a7.51,7.51,0,0,0-3.724.989,7.791,7.791,0,0,0-2.818,2.68,6.856,6.856,0,0,0-1.06,3.692A7.354,7.354,0,0,0-4.24,14.06a7.92,7.92,0,0,0,1.417,2.4,7.041,7.041,0,0,0,2.3,1.779,6.859,6.859,0,0,0,3.032.66,7.741,7.741,0,0,0,3.938-1.011,7.315,7.315,0,0,0,2.719-2.72,7.3,7.3,0,0,0,.978-3.675,7.252,7.252,0,0,0-.616-2.988A7.028,7.028,0,0,0,7.883,6.183a7.7,7.7,0,0,0-2.34-1.478A7.064,7.064,0,0,0,2.9,4.178Zm44.374,6.053a2.958,2.958,0,0,0-1.263.472A4.477,4.477,0,0,0,44.5,12.215a4.745,4.745,0,0,0-.67,2.609,4.477,4.477,0,0,0,.878,2.724,2.887,2.887,0,0,0,2.45,1.187,6.107,6.107,0,0,0,3.395-1.373l-.2-.264a4.9,4.9,0,0,1-1.242.67,3.342,3.342,0,0,1-1.055.187,2.512,2.512,0,0,1-2.043-1.11,3.334,3.334,0,0,1-.588-1.148,8.472,8.472,0,0,1-.2-1.6l5.493-1.186-.022-.407a.652.652,0,0,1-.319-.055.661.661,0,0,1-.187-.22A3.446,3.446,0,0,0,49.34,11a2.817,2.817,0,0,0-1.043-.61A3.6,3.6,0,0,0,47.269,10.231ZM23.923,18.559c.5,0,1.472.052,2.9.154V18.3a6.442,6.442,0,0,1-1-.192c-.372-.1-.593-.244-.659-.434a26.265,26.265,0,0,1-.165-4.2l.087-5.28a24.111,24.111,0,0,1,.429-4.7h-.331A17.1,17.1,0,0,1,22.22,4.974v.346l.122-.019.022,0,.144-.022a1.6,1.6,0,0,1,.211-.011.862.862,0,0,1,.752.274,9.244,9.244,0,0,1,.3,3.3c0,.911-.018,1.931-.055,3.118-.037,1.15-.078,2.186-.122,3.079-.045.911-.084,1.473-.121,1.718a1.832,1.832,0,0,1-.428,1.076,2.12,2.12,0,0,1-1.165.494v.34A19.7,19.7,0,0,1,23.923,18.559ZM30.471,9.99h0a7.623,7.623,0,0,1-2.56,1.439.215.215,0,0,0-.2.22c0,.059.165.106.5.143a1.457,1.457,0,0,1,.55.11,1.149,1.149,0,0,1,.192.6c.033.293.05.948.05,2,0,.08-.009.441-.027,1.071-.02.656-.043,1.192-.072,1.637a3.273,3.273,0,0,1-.1.786c-.081.16-.436.271-1.055.329l-.044.34,4.427-.11-.131-.319a6.974,6.974,0,0,0-.769-.066,2.057,2.057,0,0,1-.527-.088.452.452,0,0,1-.22-.252,7.4,7.4,0,0,1-.137-1.391c-.026-.674-.039-1.2-.039-1.576,0-.494.017-1.064.049-1.692.034-.651.076-1.265.126-1.824a9.434,9.434,0,0,1,.187-1.318.7.7,0,0,0-.209-.044Zm10.316,8.5a12.358,12.358,0,0,1,1.912.131l-.022-.34c-.051-.021-.229-.067-.561-.143a1.608,1.608,0,0,1-.56-.186,4.675,4.675,0,0,1-.143-1.692V13.648A10.749,10.749,0,0,0,41.3,11.9a2.006,2.006,0,0,0-.6-1.132,2.194,2.194,0,0,0-1.552-.466,4.268,4.268,0,0,0-1.491.291,14.97,14.97,0,0,0-1.984.972,8.84,8.84,0,0,0-.044-1.055c-.03-.211-.1-.319-.21-.319a2.059,2.059,0,0,0-.5.221,7.827,7.827,0,0,1-.833.391,8.7,8.7,0,0,1-1.263.47.759.759,0,0,1,.022.214,3.63,3.63,0,0,1,1.005.2.734.734,0,0,1,.351.581,11.483,11.483,0,0,1,.083,1.705c0,.605-.011,1.2-.033,1.778a14.205,14.205,0,0,1-.121,1.481,1.134,1.134,0,0,1-.121.417.75.75,0,0,1-.363.274,4.357,4.357,0,0,1-.868.23l.022.319h2.412c.482.015.861.033,1.157.055.321.023.542.04.694.055l.023-.341a4.742,4.742,0,0,1-.968-.181.713.713,0,0,1-.368-.237.914.914,0,0,1-.1-.4c-.044-.409-.058-1.241-.043-2.472l.066-2.922a6.537,6.537,0,0,1,1.677-.648,6.007,6.007,0,0,1,1.063-.143,1.445,1.445,0,0,1,1.162.44,2.015,2.015,0,0,1,.455,1.06,12.535,12.535,0,0,1,.082,1.587c0,.436-.02,1.048-.06,1.819a5.128,5.128,0,0,1-.225,1.533,1.772,1.772,0,0,1-1.241.625v.319C39.438,18.537,40.182,18.493,40.787,18.493Zm-21.368,0a12.375,12.375,0,0,1,1.912.131l-.022-.34c-.051-.021-.234-.069-.56-.143a1.615,1.615,0,0,1-.561-.186,4.675,4.675,0,0,1-.143-1.692V13.648A10.772,10.772,0,0,0,19.93,11.9a2.013,2.013,0,0,0-.6-1.132,2.194,2.194,0,0,0-1.552-.466,4.268,4.268,0,0,0-1.491.291,15.078,15.078,0,0,0-1.985.972,8.56,8.56,0,0,0-.044-1.055c-.03-.214-.1-.319-.21-.319a2.04,2.04,0,0,0-.5.221,8.038,8.038,0,0,1-.833.391,8.756,8.756,0,0,1-1.263.47.771.771,0,0,1,.022.214,3.63,3.63,0,0,1,1.005.2.734.734,0,0,1,.351.581,11.215,11.215,0,0,1,.083,1.705c0,.605-.011,1.2-.033,1.778a14.205,14.205,0,0,1-.121,1.481,1.13,1.13,0,0,1-.121.417.755.755,0,0,1-.363.274,4.34,4.34,0,0,1-.868.23l.022.319h2.412c.482.015.86.033,1.156.055.321.023.542.04.694.055l.023-.341a4.715,4.715,0,0,1-.967-.181.71.71,0,0,1-.368-.237.9.9,0,0,1-.1-.4c-.044-.4-.059-1.213-.044-2.472l.066-2.922a6.543,6.543,0,0,1,1.677-.648,6.007,6.007,0,0,1,1.063-.143,1.445,1.445,0,0,1,1.162.44,2.015,2.015,0,0,1,.455,1.06,12.5,12.5,0,0,1,.083,1.587c0,.424-.02,1.019-.06,1.819a5.153,5.153,0,0,1-.226,1.533,1.771,1.771,0,0,1-1.241.625v.319C18.07,18.537,18.813,18.493,19.419,18.493Zm10.81-13.82a.846.846,0,0,0-.6.241.819.819,0,0,0-.253.616.864.864,0,0,0,.857.857.789.789,0,0,0,.6-.253.857.857,0,0,0,.236-.6.847.847,0,0,0-.241-.6A.8.8,0,0,0,30.229,4.673ZM3.456,18.109A5.65,5.65,0,0,1,.247,17.081a7.439,7.439,0,0,1-2.416-2.74,7.737,7.737,0,0,1-.9-3.637,6.208,6.208,0,0,1,.736-3.065,5.121,5.121,0,0,1,1.944-2A5.188,5.188,0,0,1,2.2,4.947a5.383,5.383,0,0,1,2.407.565A6.335,6.335,0,0,1,6.626,7.105a7.675,7.675,0,0,1,1.362,2.39,8.507,8.507,0,0,1,.489,2.879,6.421,6.421,0,0,1-.735,3.2,4.829,4.829,0,0,1-1.885,1.917A5,5,0,0,1,3.456,18.109ZM45.248,13.67h0A6.362,6.362,0,0,1,45.67,11.8a1.207,1.207,0,0,1,1.17-.868,1.925,1.925,0,0,1,1.148.351,2.792,2.792,0,0,1,.752.775,1.443,1.443,0,0,1,.264.6c0,.081-.052.14-.154.176s-.339.1-.724.187c-.132.021-.392.077-.775.165a5.433,5.433,0,0,0-.665.176l-1.438.308Z" transform="translate(77.426 1)" fill="#e74799"/>
                <path id="Path_1" data-name="Path 1" d="M14.835,16.792q-.055.143-.472,1.626-1.187.352-2.153.544a10.764,10.764,0,0,1-2.1.192,8.1,8.1,0,0,1-2.725-.483,7.505,7.505,0,0,1-2.45-1.434,6.912,6.912,0,0,1-1.725-2.318A7.294,7.294,0,0,1,2.574,11.8,6.759,6.759,0,0,1,3.755,7.761a7.044,7.044,0,0,1,3.01-2.428,9.53,9.53,0,0,1,3.774-.78,8.223,8.223,0,0,1,2.944.538,3.646,3.646,0,0,0,.989.209q.154-.033.225-.044t.181-.022a.207.207,0,0,1,.143.088l-.165.626a16.214,16.214,0,0,0-.406,2.1.365.365,0,0,1-.264-.137.649.649,0,0,1-.066-.335,2,2,0,0,0-.187-.945,3.258,3.258,0,0,0-1.483-.989,6.039,6.039,0,0,0-2.384-.505A5.253,5.253,0,0,0,5.183,8.222a8.015,8.015,0,0,0-.742,3.56A7.391,7.391,0,0,0,5.1,15.017a6.089,6.089,0,0,0,1.637,2.148,6.7,6.7,0,0,0,2,1.143,5.523,5.523,0,0,0,1.763.352,4.384,4.384,0,0,0,1.967-.39,3.674,3.674,0,0,0,1.225-.934,8.629,8.629,0,0,0,.862-1.3q.165-.319.286-.319.209,0,.209.2A5.451,5.451,0,0,1,14.835,16.792Zm3.538-4.274-1.351.6a2.4,2.4,0,0,1-.088-.516,1.313,1.313,0,0,1,.687-1.038,6.257,6.257,0,0,1,1.549-.775,4.474,4.474,0,0,1,1.2-.3,1.523,1.523,0,0,1,.736.264,3.652,3.652,0,0,1,.7.527,2.05,2.05,0,0,1,.357.434,2.386,2.386,0,0,1,.225.676,5.766,5.766,0,0,1,.1,1.176q0,.209-.055,1.472l-.044.824q-.044.593-.044.945a4.255,4.255,0,0,0,.121.967q.11.527.494.527a3.016,3.016,0,0,0,1.143-.319v.45l-1.615.648a3.688,3.688,0,0,1-.549.165.666.666,0,0,1-.5-.335,2.849,2.849,0,0,1-.4-.8,7.253,7.253,0,0,1-3.12,1.132,1.27,1.27,0,0,1-1.011-.39,1.736,1.736,0,0,1-.341-1.17,2.592,2.592,0,0,1,.181-1.11,1.289,1.289,0,0,1,.588-.571,7.342,7.342,0,0,1,1.747-.621q.923-.2,1.934-.346l.055-1.351v-.363a2.02,2.02,0,0,0-.533-1.478A1.692,1.692,0,0,0,19.3,11.31a1.405,1.405,0,0,0-.687.192.6.6,0,0,0-.346.544A1.456,1.456,0,0,0,18.372,12.518Zm2.6,5.2q-.033-.363.066-2.065A4.419,4.419,0,0,0,18.721,16q-.876.45-.876,1.132a1.763,1.763,0,0,0,.268.934.828.828,0,0,0,.739.439A6.5,6.5,0,0,0,20.976,17.715Zm3.45,1.307.022-.341A2.541,2.541,0,0,0,25.4,18.3a1.6,1.6,0,0,0,.434-.976,13.674,13.674,0,0,0,.137-2.27,10.312,10.312,0,0,0-.148-2.106,1.129,1.129,0,0,0-.439-.779,2.366,2.366,0,0,0-.961-.176v-.368a8.439,8.439,0,0,0,2.406-1.016.426.426,0,0,1,.22-.088q.22,0,.269.571a5.381,5.381,0,0,1,.005,1q.231-.132.818-.445t.923-.472a7.237,7.237,0,0,1,.862-.33,3.063,3.063,0,0,1,.923-.17A2.21,2.21,0,0,1,31.979,11a1.7,1.7,0,0,1,.764,1.071,7.818,7.818,0,0,1,3.522-1.077,2.143,2.143,0,0,1,1.541.472,2.038,2.038,0,0,1,.589,1.214,16.416,16.416,0,0,1,.1,2.137V16.77q-.033.846-.022,1.159a.639.639,0,0,0,.1.406.605.605,0,0,0,.346.126q.088.011.61.121t.6.121l-.154.3H35.808l-.066-.3a2.565,2.565,0,0,0,.934-.385,1.45,1.45,0,0,0,.357-.89,18.268,18.268,0,0,0,.1-2.384,7.394,7.394,0,0,0-.17-1.714,2,2,0,0,0-.61-1.082,1.807,1.807,0,0,0-1.219-.379,5.612,5.612,0,0,0-2.3.6q.055.461.077,1.588t.044,2.318q.022,1.192.033,1.544a.916.916,0,0,0,.1.412.476.476,0,0,0,.291.17q.214.055.917.154V19H32.929q-.187,0-1.384.044t-1.428.044l-.066-.341a2.684,2.684,0,0,0,1.044-.379,1.262,1.262,0,0,0,.423-.835A12.463,12.463,0,0,0,31.6,15.5l-.022-1.066a4.515,4.515,0,0,0-.412-2.06,1.348,1.348,0,0,0-1.28-.709,2.91,2.91,0,0,0-.9.154,6.535,6.535,0,0,0-.9.368q-.428.214-.736.379-.011.187-.022.95T27.3,14.77v1.121q.022,1.967.066,2.142a.6.6,0,0,0,.319.357,3.943,3.943,0,0,0,1.187.291v.385q-.132,0-.945-.044t-.967-.044Zm15.952-6.877-.088-.313a7.011,7.011,0,0,1,.737-.408,3.713,3.713,0,0,0,.963-.463,4,4,0,0,0,1.117-.849,12.183,12.183,0,0,1,.236,1.549l.945-.374a6.467,6.467,0,0,1,2.23-.615,2.968,2.968,0,0,1,1.642.538,4.1,4.1,0,0,1,1.329,1.45A3.937,3.937,0,0,1,50,14.616a3.836,3.836,0,0,1-.6,2.214,4.223,4.223,0,0,1-1.489,1.362,6.775,6.775,0,0,1-1.7.665,6.1,6.1,0,0,1-1.236.187,5.224,5.224,0,0,1-1.626-.319q0,.2-.022,1.239T43.3,21.182v2a6.222,6.222,0,0,0,.055,1,.513.513,0,0,0,.2.378,1.3,1.3,0,0,0,.511.1l.8.044q.275,0,.275.214,0,.135-.082.169a1.334,1.334,0,0,1-.39.034q-1.362,0-1.7.016t-2.241.137a2.057,2.057,0,0,0-.022-.33,1.893,1.893,0,0,0,.747-.159.777.777,0,0,0,.3-.379,7.661,7.661,0,0,0,.231-1.938q.055-1.455.055-3.036l.022-1.373q0-1.581-.022-3.267a19.134,19.134,0,0,0-.088-2.059,1.677,1.677,0,0,0-.17-.423,1.117,1.117,0,0,0-.275-.329.519.519,0,0,0-.324-.126A3.836,3.836,0,0,0,40.378,12.145Zm2.944-.033L43.3,17.671l1.011.341a6.151,6.151,0,0,0,1.6.385,3.2,3.2,0,0,0,1.2-.269,2.835,2.835,0,0,0,1.159-.906,2.61,2.61,0,0,0,.5-1.659A4.423,4.423,0,0,0,46.97,12a2.577,2.577,0,0,0-1.461-.538A11.427,11.427,0,0,0,43.322,12.112Zm7.712.242V11.9l2.449-1.356.221-.088q.154,0,.154.2l-.137,1.89q-.137,2.241-.137,2.769a5.566,5.566,0,0,0,.329,2.06,1.461,1.461,0,0,0,1.534.818,2.7,2.7,0,0,0,.795-.126,7.19,7.19,0,0,0,.953-.385q.542-.258.849-.412a10.622,10.622,0,0,1,.033-1.072l.066-2.243a6.273,6.273,0,0,0-.066-1.439.714.714,0,0,0-.379-.542,2.8,2.8,0,0,0-.928-.142l-.022-.423,2.933-.687q-.055.989-.115,1.884t-.11,1.917q-.049,1.022-.049,1.516a8.182,8.182,0,0,0,.209,2.241,4.044,4.044,0,0,0,1.23-.264v.494q-1.246.341-2.525.813a9.057,9.057,0,0,1-.3-1.56,10.356,10.356,0,0,1-3.728,1.373,2.061,2.061,0,0,1-1.4-.669,3.416,3.416,0,0,1-.636-2.589l.088-2.468a4.553,4.553,0,0,0-.049-1,.391.391,0,0,0-.423-.346A2.736,2.736,0,0,0,51.035,12.353Zm10.69,4.175.385.022a1.451,1.451,0,0,0,.357.681,3.548,3.548,0,0,0,.961.851,2.434,2.434,0,0,0,1.318.379,2.619,2.619,0,0,0,1.033-.22.924.924,0,0,0,.516-.956,1.582,1.582,0,0,0-.531-1.241,5.966,5.966,0,0,0-1.222-.8l-.826-.385a4.8,4.8,0,0,1-1.156-.791,1.387,1.387,0,0,1-.429-1.055,1.947,1.947,0,0,1,.363-1.06,2.757,2.757,0,0,1,1.052-.917,3.292,3.292,0,0,1,1.558-.363,15.266,15.266,0,0,1,1.762.165l.363,1.868h-.385a1.573,1.573,0,0,0-.457-.731,3.394,3.394,0,0,0-.838-.588,1.9,1.9,0,0,0-.821-.242,1.282,1.282,0,0,0-.948.363,1.253,1.253,0,0,0-.364.925.965.965,0,0,0,.266.716,3.793,3.793,0,0,0,1,.636l.672.317a6.538,6.538,0,0,1,1.563,1,2.044,2.044,0,0,1,.649,1.6,2.374,2.374,0,0,1-.16.818,1.139,1.139,0,0,1-.479.621,6.194,6.194,0,0,1-1.508.752,4.375,4.375,0,0,1-1.211.17,5.052,5.052,0,0,1-.627-.055q-.407-.055-.572-.088t-.572-.154q-.407-.121-.528-.154A3.692,3.692,0,0,0,62,17.989a4.175,4.175,0,0,0-.093-.753A4.66,4.66,0,0,0,61.724,16.528Z" transform="translate(-2.574 1)" fill="#e74799"/>
              </svg>
            </div>
            <div onClick={()=>{setEnterSearchMode(true)}} className={`flex md:hidden rounded-full bg-blue-grey-50 dark:bg-bdark-200 p-1.5 transition duration-300 ease ${enterSearchMode? 'absolute w-11/12 items-start':'items-center'}`}>
              <form className="flex items-center" onSubmit={(e)=>{e.preventDefault(); setEnterSearchMode(false); router.push(`/trending?word=${e.target.elements.minSearch.value}`)}}>
                <SearchIcon className = "h-5 cursor-pointer text-gray-500 dark:text-gray-400"/>
                <input id="minSearch" type="search" onChange={search} className = {`md:hidden ml-2 bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 w-full h-full ${enterSearchMode?'inline-flex':'hidden'}`} placeholder="Search"/>
                <button hidden type="submit"></button>
              </form>
            </div>
        </div>
        {/*centre*/}
        <div className = "hidden md:flex md:justify-center flex-grow">
          <div onClick={()=>{setEnterSearchMode(true)}} className = "flex items-center rounded-full bg-blue-grey-50 dark:bg-bdark-200 px-1.5 py-1 focus:shadow-md">
            <form className="flex items-center" onSubmit={(e)=>{e.preventDefault(); setEnterSearchMode(false); router.push(`/trending?word=${e.target.elements.jsearch.value}`)}}>
              <SearchIcon className = "h-5 text-gray-500 dark:text-gray-400"/>
              <input id="jsearch" type="search" onChange={search} className = "hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Search"/>
              <button hidden type="submit"></button>
            </form>
          </div>
        </div>
        {/*right*/}
        {currentUser ? 
        <div className = "hidden md:flex md:items-center md:justify-end md:mr-8 lg:mr-16">
          <div title="home" onClick = {handleHome}><HeaderIcon active = {tabActive[tabActive.length-1] === 'home'?true:undefined} Icon = {HomeIcon} unread={newPosts !==0 && newPosts}/></div>
          <div title="global" onClick = {handleGlobal}><HeaderIcon active = {tabActive[tabActive.length-1] === 'global'?true:undefined} Icon = {GlobeAltIcon}/></div>
          <div title="chat" onClick = {()=>{memorizeScrollPosition(); setTabActive('chat'); router.push('/chats')}}><HeaderIcon active = {tabActive[tabActive.length-1] === 'chat'?true:undefined} Icon = {ChatAlt2Icon} unread={unreadChats?.length !== 0 && unreadChats?.length }/></div>
          <div title="make a post" onClick = {()=>{memorizeScrollPosition(); setTabActive('post')}}><HeaderIcon active = {tabActive[tabActive.length-1].slice(0, 4) === 'post'?true:undefined} Icon = {PlusCircleIcon}/></div>
          <div title="notifications" onClick = {()=>{memorizeScrollPosition(); setTabActive('notification')}}><HeaderIcon active = {tabActive[tabActive.length-1] === 'notification'?true:undefined} Icon = {BellIcon} unread={unreadNotifications !== 0 && unreadNotifications }/></div>
          <div className = "hidden md:block text-center pl-3 relative">
              <img title="account" onClick = {()=>setShowAccMenu(true)}
              className = {`h-7 w-7 avatar object-cover rounded-full cursor-pointer ${tabActive[tabActive.length - 1]==='profile' ? 'border-2 border-pink-500': ''}`}
              src={currentUser.profilePicture}/>
            {showAccMenu && <div ref={accRef} className="absolute w-40 bg-white dark:bg-bdark-100 border dark:border-bdark-200 shadow-all dark:shadow-all-lg -right-5 top-8 rounded-lg overflow-hidden">
              <Link href={`/u/${currentUser.username}`} passHref>
                <div onClick={()=> {memorizeScrollPosition(); setTabActive('profile'); setShowAccMenu(false)}} className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-2 space-x-2">
                  <UserCircleIcon className="h-5 w-5"/>
                  <p>Profile</p>
                </div>
              </Link>
              <div onClick={()=>{memorizeScrollPosition(); setTabActive('settings'); setShowAccMenu(false); router.push('/settings')}} className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-2 space-x-2">
                <CogIcon className="h-5 w-5"/>
                <p>Settings</p>
              </div>
              <div onClick={()=>logout()} className="flex items-center cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-bdark-50 p-2 space-x-2 border-t border-gray-300 dark:border-bdark-200">
                <p>Log Out</p>
              </div>
            </div>}
          </div>
        </div>
        :
        <div className="hidden md:flex items-center justify-end space-x-5 mr-8">
          <button className='clicky h-8 w-24 rounded-full shadow-md  text-center cursor-pointer hover:shadow-lg dark:shadow-lg dark:hover:shadow-xl bg-pink-500 text-white dark:text-gray-200' onClick={()=>{router.replace('/login')}}>Login</button>
          <button className='clicky h-8 w-24 rounded-full shadow-md border border-pink-500 text-pink-500 text-center bg-white dark:bg-bdark-200 cursor-pointer hover:shadow-lg dark:text-pink-500 dark:shadow-lg dark:hover:shadow-xl' onClick={()=>{router.replace('/signup')}}>Sign Up</button>
        </div>}
      </div>
      {enterSearchMode && <SearchContainer hits={searchRes} clearSearch={clearSearch}/>}
      {enterSearchMode && <div onClick={()=>{setEnterSearchMode(false); setSearchRes([])}} className='w-screen h-full block md:hidden fixed z-10 bg-gray-900 opacity-40'/>}
      {(tabActive[tabActive.length - 1].slice(0,4) === "post" || tabActive[tabActive.length - 1]==='updatePP' || tabActive[tabActive.length - 1]==='updateCI' || tabActive[tabActive.length - 1]==='notification' || tabActive[tabActive.length - 1]==='delAcc' || tabActive[tabActive.length - 1]==='share' || tabActive[tabActive.length - 1]==='fflist') && <div onClick={()=>{setTabActive(tabActive[tabActive.length-2]==='notification' ? tabActive[tabActive.length-3] : "go back"); setEnterSearchMode(false)}} className='w-screen h-screen fixed top-0 z-50 bg-black opacity-40'/>}
      {currentUser && <div>
        <NotificationPane/>
      </div>}
      {tabActive[tabActive.length - 1].slice(0,4) === "post" && <div>
        <PostDialog/>
      </div>}
      {tabActive[tabActive.length - 1]==='delAcc' && <DeleteAccountDialog/>}
      {(refreshFeedPosts || refreshGlobalPosts) && <div className="mt-4 z-50 fixed x-centered">
        <div className="loader mx-auto animate-spin"></div>
      </div>}
    </>
  )
}


export default Header
