import Feed from './feed';
import Login from './Login';
import SiteLayout from '../components/SiteLayout';
import { useAuth } from '../firebase/AuthContext';

export default function Home() {
  const {currentUser} = useAuth()
  return (
    <div className='h-screen bg-blue-grey-50 dark:bg-bdark-200 overflow-hidden'>
    {currentUser?<Feed/>:<Login/>}
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
// export async function getServerSideProps(){
//   //Get user
//   const {currentUser} = useAuth()
//   return{
//     props:{
//       currentUser
//     }
//   }
// }