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
import FlipMove from 'react-flip-move';

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
  const [readReciepts, setReadReciepts] = useState(false);
  const scrollRef = useRef()
  const socket = useRef();

//get initial Chats
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
  
  //get socket infos
  useEffect(() => {
    socket.current = io("http://localhost:5000", {withCredentials: true})
    socket.current.on("getMessage", async (data) => {
      setNewMessage(data)
    });
    socket.current.on("msgsRead", async (id) => {
      setReadReciepts({id, updated: Date.now()})
    });
  }, []);

  //add user (online)
  useEffect(()=>{
    socket.current.emit("addUser", currentUser._id);
  }, [socket.current, currentUser])
  
  //recieved msgs
  useEffect(()=>{
    if(newMessage){
      const sameUser = activeChat?.members.includes(newMessage.from)
      sameUser && setMessages((oldValues) => {return [...oldValues, {from: newMessage.from, message: newMessage.message, read: newMessage.read, createdAt: newMessage.createdAt}]});
      var targetId = chats.findIndex(c=>c.members && c.members.find(m=>m===newMessage.from))
      var newChats = chats
      if(targetId !== -1){
        const target = newChats[targetId]
        target.messages = [...target?.messages, {from: newMessage.from, message: newMessage.message, read: newMessage.read, createdAt: newMessage.createdAt}]
        //remove targetted chat and push to top
        newChats.splice(targetId, 1)
        newChats.unshift(target)
        newChats = [...newChats, {updated: Date.now()}]
        setChats(newChats)
				sameUser && readMsgs(targetId, "to")
      }else{
        try{
          async function getChats(){
            await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/chats/" + currentUser._id).then((res)=>{
              setChats([...res.data, {updated: Date.now()}])
            })
          }
          getChats()
        }catch(error){
          console.log(error)
        }
      }
    }
  }, [newMessage])

  //messages read
  useEffect(()=>{
    if(readReciepts){
      console.log(readReciepts)
      readMsgs(chats.findIndex(c=>c._id && c._id === readReciepts.id), "from")
    }
  },[readReciepts])

  //scroll to bottom
  useEffect(()=>{
    // scrollRef.current?.scrollIntoView({behavior: "smooth"})
    scrollRef.current?.scrollIntoView()
  },[messages, openChat===true])
  
  //active tabs
  useEffect(()=>{
    if(tabActive==='chat')return; 
    setPrevPrevTab(prevTab); 
    setPrevTab(tabActive); 
    setTabActive('chat');
  },[])
  
  //expand text area
  useEffect(()=>{
    var textarea = document.getElementById("_p");
    textarea.oninput = function() {
      textarea.style.height = ""; /* Reset the height*/
      textarea.style.height = textarea.scrollHeight + "px";
    }
  },[document.getElementById("_p")])

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
        setChats([res.data, ...chats])
      }else{
        setMessages([...messages, res.data])
        var targetId = chats.findIndex(c=>c?._id === activeChat._id)
        var newChats = chats
        const target = newChats[targetId]
        target.messages = [...messages, res.data]
        newChats.splice(targetId, 1)
        newChats.unshift(target)
        newChats = [...newChats, {updated: Date.now()}]
        setChats(newChats)
      }
    }).then(()=>{
      socket.current.emit("sendMessage", {
        from: currentUser._id,
        to: to,
        message: msg,
      })
    })

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
      const target = chats.findIndex(c=>c.members && c.members.find(m=>m===id))
      if(target !== -1){
        setActiveChat(chats[target])
        setMessages(chats[target].messages)
        setOpenChat(true)
        readMsgs(target, "to")
      }else{
        setActiveChat({members: [currentUser._id, id]})
        setMessages([])
        setOpenChat(true)
      }
    }else if(chat){
      setActiveChat(chat)
      setMessages(chat.messages)
      setOpenChat(true)
      readMsgs(chats.findIndex(c=>c._id && c._id === chat._id), "to")
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
    document.querySelector("#chatSearch").textContent = ""
    setSearchRes([])
  }
  
  function readMsgs(index, who){
    console.log("reading object at " + index)
    who === "to" && socket.current.emit("readMsgs", {chatId: chats[index]._id, from: chats[index].members.find((m) => m !== currentUser._id)});
    var target = chats[index]
    var newChat = chats
    if(who === "to"){
      target.messages.forEach(m => {
        if(m.from !== currentUser._id && m.read === false){
          m.read=true
        }
      })
    }else if(who === "from"){
      target.messages.forEach(m => {
        if(m.from === currentUser._id && m.read === false){
          m.read=true
        }
      })
    }
    
    newChat[index] = target
    setMessages([...target.messages, {updated: Date.now()}])
    setChats(newChat)
  }

	return(	
		<div className='flex bg-blue-grey-50 dark:bg-bdark-200 minus-header justify-center items-center'>
			<div className='flex h-full w-full lg:h-5/6 lg:w-3/5 rounded-none md:rounded-lg overflow-hidden lg:border border-pink-500'>
				<div className={`md:w-2/5 md:left-0 h-full overflow-y-auto bg-white dark:bg-bdark-100 shadow-md transition-all ease-linear duration-200 ${openChat?'w-0':'w-screen'}`}>
					<div className="top-0 z-50 py-3 bg-white dark:bg-bdark-100 border-b border-pink-500 mt-4 md:mt-0">
            <div className='flex items-center rounded-full bg-blue-grey-50 dark:bg-bdark-200 px-1.5 py-1 mx-5'>
              <SearchIcon className = "h-5 text-gray-500 dark:text-gray-400"/>
              <input id="chatSearch" onChange={search} className = "ml-2 items-center bg-transparent outline-none placeholder-gray-400 dark:placeholder-gray-500 text-gray-500 dark:text-gray-400 w-full" type = "text" placeholder="Search"/>
            </div>
            <div className="sticky z-50">
              <SearchChat hits={searchRes} clearSearch={clearSearch} setCurrentChat={setCurrentChat}/>
            </div>
          </div>
          <>
          {chats?.length !== 0 ?
            <FlipMove>
            {chats.map(chat=>
            !chat.updated &&
              <div key={chat._id} onClick={()=>setCurrentChat(chat, null, null)}>
                <Chat sender={chat.members.find(m=> m !== currentUser._id)} message={chat.messages[chat.messages.length - 1]} unread={chat.messages.filter(m=>m.from !== currentUser._id && m.read===false)}/>
              </div>
            )}
            </FlipMove>
            :
            <div className='text-gray-500 dark:text-gray-400 w-full h-full flex flex-col justify-center items-center'>
              Chats appear here
            </div>
          }
          </>
					<div className='mt-14 md:mt-0'></div>
				</div>
				<div className={`md:w-3/5 flex flex-col h-full border-l border-pink-500 overflow-y-auto relative transition-all ease-linear duration-200 ${openChat?'w-screen':'w-0'}`}>
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
            <div className='flex flex-col p-2 flex-1'>
              {
                <FlipMove style={{ display: 'flex', flexDirection: 'column'}}>
                  {messages?.map(message=>
                  !message.updated &&
                    <Message key={message.createdAt} from={message.from} msg={message.message} ts={message.ts} read={message.read} sent={message.createdAt}/>
                  )}
                </FlipMove>
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