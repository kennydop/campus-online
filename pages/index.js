import {getSession} from "next-auth/client";
import Feed from './feed';
import Login from './Login';
import SiteLayout from '../components/SiteLayout';

export default function Home({session}) {
  return (
    <div className='h-screen bg-blue-grey-50 dark:bg-bdark-200 overflow-hidden'>
    {session?<Feed/>:<Login/>}
    </div>
  )
}
Home.getLayout = function getLayout(page) {
  return (
      <SiteLayout>
          {page}
      </SiteLayout>
  )
}
export async function getServerSideProps(context){
  //Get user
  const session = await getSession(context)
  return{
    props:{
      session
    }
  }
}