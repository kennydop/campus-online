import Chat from '../components/Chat'
import NotAuthorized from '../components/NotAuthorized';
import { SiteLayout } from '../Layouts/Layouts';
import { useAuth } from '../contexts/AuthContext';

const messages = [
	{
		key: '1',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a',
		sender: 'Ni_🌸_na',
		time: '11/20/2029 9:15',
		text: 'Have you played Coro Dash yet?',
		read: false,
	},
	{
		key: '2',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fdownload.jfif?alt=media&token=fe85d6f9-fa5d-4f00-a660-442113a7acdd',
		sender: 'Danings',
		time: '11/19/2029 8:00',
		text: 'Well......',
		read: false,
	},
	{
		key: '3',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fperry.jpg?alt=media&token=6a441fe1-dc74-42d9-a524-81025960afd6',
		sender: 'Perry',
		time: '10/22/2021 13:40',
		text: "I've been calling your phone 🤦🏾‍♂️",
		read: true,
	},
	{
		key: '4',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fable.jpg?alt=media&token=51c8ccff-93b7-4797-853f-46e31dc6dc86',
		sender: '__.__able',
		time: '10/22/2021 7:05',
		text: 'Meanie😂',
		read: true,
	},
	{
		key: '5',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fbestman.jpg?alt=media&token=f7f32db7-fb24-49dd-94cb-2815f6ed55d4',
		sender: 'best.man_',
		time: '10/22/2021 8:15',
		text: "GOAT's trending!!",
		read: false,
	},
	{
		key: '6',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fpriscilla.jpg?alt=media&token=d7cb130e-137e-4911-a0b2-343c8dc40174',
		sender: 'pri.scilla_💖',
		time: '10/22/2021 10:11',
		text: 'I am soo happy rn 😂',
		read: true,
	},
	{
		key: '7',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fela.jpg?alt=media&token=ea7c76ed-1486-4ce2-88a0-0e04cd3893fb',
		sender: '_ella🦋',
		time: '10/21/2021 12:00',
		text: "I'm leading the Coro Dash board 🎉",
		read: true,
	},
	{
		key: '8',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Ftom.jpg?alt=media&token=2ea4feb3-09d4-45ea-b4fe-4946a9c9bc7d',
		sender: 'tom🏳‍🌈',
		time: '10/21/2021 11:54',
		text: "When's it?",
		read: true,
	},
	{
		key: '9',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fenyo.jpg?alt=media&token=d8f06195-d1dd-41b7-9838-c253e1ffd1a5',
		sender: 'enyo_',
		time: '10/20/2021 1:08',
		text: 'You good?',
		read: true,
	},
	{
		key: '10',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fchats%2Fricky.jpg?alt=media&token=4de0a759-b5ce-42d8-812b-26da8017fa5f',
		sender: 'kunta',
		time: '10/19/2021 12:00',
		text: 'exactly what I was saying',
		read: true,
	},
	{
		key: '11',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fmoon.jpg?alt=media&token=319ab979-efbf-4a6b-a5c6-da76b933e1be',
		sender: '🌝mo.on🌚',
		time: '10/19/2021 4:11',
		text: 'Thank you',
		read: true,
	},
	{
		key: '12',
		img: 'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Frue.jpg?alt=media&token=bd05af33-a8ca-457e-b67b-d0e86387c4f5',
		sender: 'rue',
		time: '10/19/2021 12:56',
		text: 'Cool',
		read: true,
	},
]

function Chats(){
	const {currentUser} = useAuth()
	
	return(	
		currentUser?
		<div className='bg-blue-grey-50 dark:bg-bdark-200'>
			<div className='flex h-full'>
				<div className='w-full md:w-96 md:left-0 md:sticky h-full overflow-y-auto bg-white dark:bg-bdark-100 shadow-md'>
					<div className='mb-14 md:mb-1'>
						{messages.map(message=>
							<Chat key={message.key} img={message.img} sender={message.sender} text={message.text} time={message.time} read={message.read}/>
							)}
					</div>
				</div>
			</div>
		</div>
		:
		<NotAuthorized/>
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