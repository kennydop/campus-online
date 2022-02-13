import ButtomNavbar from "../components/ButtomNavbar";
import Header from "../components/Header";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";
import TrendingBox from "../components/TrendingBox";

export function FeedLayout({children}) {
  return (
    <>
      <Header/>
      <ButtomNavbar/>
      <div className='flex flex-grow bg-blue-grey-50 dark:bg-bdark-200 justify-center h-full min-h-screen'>
        <TrendingBox/>
        {children}
        <PeopleYouMightKnow/>
      </div>
    </>
  )
}

export function SiteLayout({children}) {
  return (
    <>
      <Header/>
      <ButtomNavbar/>
      <main>{children}</main>
    </>
  )
}

export function ProfileLayout({children}){
  return(
    <>
      <Header/>
      <ButtomNavbar/>
      <div className='justify-center'>
        <div>
          {children}
        </div>
      </div>
    </>
  )
}
