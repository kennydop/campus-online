import Chat from '../components/Chat'
import {useSession} from 'next-auth/client';
import NotAuthorized from '../components/NotAuthorized';
import SiteLayout from '../components/SiteLayout';

function Chats(){
	const [session, loading] = useSession();

	return(
		<main>
		{session &&(
		<div className='bg-blue-grey-50 dark:bg-bdark-200 h-screen overflow-hidden'>
			<div className='flex h-full'>
				<div className='w-full md:w-96 md:left-0 md:sticky h-full overflow-y-auto bg-white dark:bg-bdark-100 shadow-md'>
					<div className='text-center'>
						<Chat img={'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fcd.png?alt=media&token=1e9fb961-e29f-4d1a-be38-8afb63a75f9a'} sender={'Edelina'} time={'12/06/2021 4:30'} text={'Have you played Coro Dash yet?'}/>
						<Chat img={'https://firebasestorage.googleapis.com/v0/b/campus-online-311.appspot.com/o/req%2Fdownload.jfif?alt=media&token=fe85d6f9-fa5d-4f00-a660-442113a7acdd'} sender={'Danings'} time={'11/06/2021 9:15'} text={'Well......'} read={true}/>
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
Chats.getLayout = function getLayout(page) {
    return (
        <SiteLayout>
            {page}
        </SiteLayout>
    )
}
export default Chats