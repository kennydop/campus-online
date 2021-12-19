/* eslint-disable react-hooks/exhaustive-deps */
import Chat from '../components/Chat'
import { useRef, useState, useEffect } from 'react';
import { SiteLayout } from '../Layouts/Layouts';
import { useAuth } from '../contexts/AuthContext';
import { useActiveTab } from "../contexts/ActiveTabContext";
import axios from 'axios';
import SearchChat from '../components/SearchChat';
import { ArrowLeftIcon, SearchIcon } from '@heroicons/react/outline';
import Message from '../components/Message';
import Link from 'next/link';
import { io } from "socket.io-client";
import TimePast from '../components/TimePast';

function Chats(){
	const {currentUser} = useAuth();
	const [ messages, setMessages ] = useState([]);
	const [ chats, setChats ] = useState([]);
	const { tabActive, prevTab, setTabActive, setPrevTab, setPrevPrevTab } = useActiveTab()
  const [searchRes, setSearchRes] = useState(null);
  const [openChat, setOpenChat] = useState();
  const [activeChat, setActiveChat] = useState();
  const [reciever, setReciever] = useState({});
  const [newMessage, setNewMessage] = useState();
  const scrollRef = useRef()
  const socket = useRef();

  useEffect(() => {
    const getChats = async () => {
      try {
        axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/chats/" + currentUser._id).then((res)=>{
          setChats(res.data);
        })
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, []);
  
  useEffect(() => {
    socket.current = io("http://localhost:5000", {withCredentials: true})
    socket.current.on("getMessage", async (data) => {
      setNewMessage(data)
    });
  }, []);

  useEffect(()=>{
    socket.current.emit("addUser", currentUser._id);
  }, [socket.current, currentUser])
  
  useEffect(()=>{
    if(newMessage){
      const sameUser = activeChat?.members.includes(newMessage.from)
      sameUser && setMessages((oldValues) => {return [...oldValues, {from: newMessage.from, message: newMessage.message, read: newMessage.read, createdAt: newMessage.createdAt}]});
      console.log(chats)
      var targetId = chats.findIndex(c=>c.members ? c.members.find(m=>m===newMessage.from) : 0)
      var newChats = chats
      if(targetId !== -1){
        newChats[targetId].messages = [...newChats[targetId].messages, {from: newMessage.from, message: newMessage.message, read: newMessage.read, createdAt: newMessage.createdAt}]
        newChats = [...newChats, {updated: Date.now()}]
        setChats(newChats)
      }else{
        axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/chats/" + currentUser._id).then((res)=>{
          setChats([...res.data, {updated: Date.now()}]);
        })
      }
    }
  }, [newMessage])

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior: "smooth"})
  },[messages, openChat===true])
  


  useEffect(()=>{
      if(tabActive==='chat')return; 
      setPrevPrevTab(prevTab); 
      setPrevTab(tabActive); 
      setTabActive('chat');
  },[])
	
	const sendMessage = async (e) => {
		e.preventDefault()
    const to = activeChat.members.find((m) => m !== currentUser._id)
    const msg = e.target.elements._p.value.trim()
    if(!msg)return
    axios.post(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/chats", {
      chatId: activeChat._id ? activeChat._id : null,
      from: currentUser._id,
      to: to,
      message: msg
    }).then((res)=>{
      if(res.data.members){
        setActiveChat(res.data)
        setMessages(res.data.messages)
        setChats([...chats, res.data])
      }else{
        setMessages([...messages, res.data])
        var targetId = chats.findIndex(c=>c?._id === activeChat._id)
        var newChats = chats
        newChats[targetId].messages = [...messages, res.data]
        newChats = [...newChats, {updated: Date.now()}]
        setChats(newChats)
      }
    })

    socket.current.emit("sendMessage", {
      from: currentUser._id,
      to: to,
      message: msg,
      // _new: activeChat._id ? false : true
    });

    e.target.elements._p.value = ""
    var textarea = document.getElementById("_p");
    textarea.style.height = "";
    textarea.style.height = textarea.scrollHeight + "px";
	}
	
  const setCurrentChat = async (chat, id, reciever) => {
    setReciever({username: "...", lastSeen: "....."})
    setMessages([])
    if(reciever){
      setReciever(reciever)
    }else{
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/" + chat.members.find(m=>m!==currentUser._id)).then((res)=>{
        setReciever(res.data);
      })
    }
    
    if(id){
      setActiveChat({members: [currentUser._id, id]})
      setOpenChat(true)
    }else if(chat){
      setActiveChat(chat)
      setMessages(chat.messages)
      setOpenChat(true)
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
    // const i = document.activeElement === document.querySelector("#minSearch")
    setSearchRes([])
  }

  useEffect(()=>{
    var textarea = document.getElementById("_p");
    textarea.oninput = function() {
      textarea.style.height = ""; /* Reset the height*/
      textarea.style.height = textarea.scrollHeight + "px";
    }
  })

	return(	
		<div className='flex bg-blue-grey-50 dark:bg-bdark-200 minus-header justify-center items-center'>
			<div className='flex h-full w-full lg:h-5/6 lg:w-3/5 rounded-none md:rounded-lg overflow-hidden lg:border border-pink-500'>
				<div className={`md:w-2/5 md:left-0 h-full overflow-y-auto bg-white dark:bg-bdark-100 shadow-md transition-all ease-linear duration-200 ${openChat?'w-0':'w-screen'}`}>
					<div className="top-0 z-50 py-3 bg-white dark:bg-bdark-100 border-b border-pink-500 mt-4 md:mt-0">
            <div className='flex items-center rounded-full bg-blue-grey-50 dark:bg-bdark-200 px-1.5 py-1 mx-5'>
              <SearchIcon className = "h-5 text-gray-500 dark:text-gray-400"/>
              <input onChange={search} className = "ml-2 items-center bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 w-full" type = "text" placeholder="Search"/>
            </div>
            <div className='z-50 w-full'>
              <SearchChat hits={searchRes} clearSearch={clearSearch} setCurrentChat={setCurrentChat}/>
            </div>
          </div>
          <>
          {chats?.length !== 0 ?
            chats.map(chat=>
            !chat.updated &&
              <div onClick={()=>setCurrentChat(chat, null, null)}>
                <Chat key={chat._id} sender={chat.members.find(m=> m !== currentUser._id)} message={chat.messages[chat.messages.length - 1]} unread={chat.messages.filter(m=>m.from !== currentUser._id && m.read===false)}/>
              </div>
            )
            :
            <div className='text-gray-500 dark:text-gray-400 w-full h-full flex flex-col justify-center items-center'>
              Chats appear here
            </div>
          }
          </>
					<div className='mt-14 md:mt-0'></div>
				</div>
				<div className={`md:w-3/5 flex flex-col justify-between h-full border-l border-pink-500 overflow-y-auto relative transition-all ease-linear duration-200 ${openChat?'w-screen':'w-0'}`}>
          <div className={`sticky top-0 z-50 py-2 bg-white dark:bg-bdark-100 border-b border-pink-500 flex items-center justify-between ${openChat?'block':'hidden'}`}>
            <div className='block md:hidden z-50' onClick={()=>setOpenChat(false)}><ArrowLeftIcon className='cursor-pointer h-5 ml-3 text-center mx-auto text-gray-500 dark:text-gray-400'/></div>
            <div className='flex flex-col items-center justify-center mx-auto text-gray-500 -ml-5 flex-1'>
              <Link href={`/${reciever}`}><p className='fit-content cursor-pointer text-center'>{reciever.username}</p></Link>
              <TimePast lastSeen={reciever.lastSeen} />
            </div>
          </div>
          {openChat ?
            messages?.length === 0 ?
            <div className='text-gray-500 dark:text-gray-400 w-full flex flex-col justify-center items-center'>
              Messages appear here
            </div>
            :
            <div className='flex flex-col p-2'>
              {
                messages.map(message=>
                  <Message from={message.from} msg={message.message} ts={message.ts} read={message.read} sent={message.createdAt}/>
                )
              }
              <div ref={scrollRef}></div>
            </div>
            :
            <div className='text-gray-500 dark:text-gray-400 w-full flex flex-col justify-center items-center h-full'>
              Select a chat
            </div>
          }
          <div className={`sticky bottom-0 z-50 py-4 border-t border-pink-500 w-full bg-white dark:bg-bdark-100 flex items-center justify-center ${openChat?'block':'hidden'}`}>
            <form className='flex items-center justify-center bg-blue-grey-50 dark:bg-bdark-200 rounded-lg focus:ring-1 focus:ring-gray-500 w-11/12' onSubmit={sendMessage}>
              <textarea id="_p" className='max-h-32 overflow-y-auto hide-scrollbar no-ta-resize outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 h-10 p-2 overflow-hidden bg-transparent w-full' 
                placeholder="Type a message"/>
              <button className='text-center text-pink-500 mr-4 hover:font-bold font-semibold transition-all duration-150' type='submit'>Send</button>
            </form>
          </div>
			  </div>
		</div>
	</div>
	)
}
Chats.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
        {page}
    </SiteLayout>
  )
}
export default Chats