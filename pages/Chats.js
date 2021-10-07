import Header from '../components/Header'
import ButtomNavbar from '../components/ButtomNavbar'
import Chat from '../components/Chat'
import {useSession} from 'next-auth/client';
import NotAuthorized from '../components/NotAuthorized';

function Chats(){
	const [session, loading] = useSession();

	return(
		<main>
		{session &&(
		<div className='bg-blue-grey-50 dark:bg-bdark-200 h-screen overflow-hidden'>
			<Header />
			<ButtomNavbar />
			<div className='flex h-full'>
				<div className='w-full md:w-96 md:left-0 md:sticky h-full overflow-y-auto bg-white dark:bg-bdark-100 shadow-md'>
					<div className='text-center'>
						<Chat img={''} sender={'Kelly'} time={'12/06/2021 4:30'} text={'Goyuuu, jon boy'}/>
						<Chat img={''} sender={'Danings'} time={'11/06/2021 9:15'} text={'My man!'} read={true}/>
					</div>
				</div>
			</div>
		</div>
		)}
		{!session &&(
            !loading &&
            <NotAuthorized />
        )}
		</main>
	)
}

export default Chats