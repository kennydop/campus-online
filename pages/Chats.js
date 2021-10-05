import Header from '../components/Header'
import ButtomNavbar from '../components/ButtomNavbar'
import Chat from '../components/Chat'
function Chats(){
	return(
		<div className='bg-blue-grey-50 h-screen overflow-hidden'>
			<Header />
			<ButtomNavbar />
			<div className='flex h-full'>
				<div className='w-full md:w-96 md:left-0 md:sticky h-full overflow-y-auto bg-white shadow-md'>
					<div className='text-center'>
						<Chat img={''} sender={'Kelly'} time={'12/06/2021 4:30'} text={'Goyuuu, jon boy'}/>
						<Chat img={''} sender={'Danings'} time={'11/06/2021 9:15'} text={'My man!'} read={true}/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Chats