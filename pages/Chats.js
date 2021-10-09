import Chat from '../components/Chat'
import {useSession} from 'next-auth/client';
import NotAuthorized from '../components/NotAuthorized';
import Layout from '../components/Layout';

function Chats(){
	const [session, loading] = useSession();

	return(
		<main>
		{session &&(
		<div className='bg-blue-grey-50 dark:bg-bdark-200 h-screen overflow-hidden'>
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
Chats.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Chats