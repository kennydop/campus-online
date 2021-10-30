import ButtomNavbar from "../components/ButtomNavbar";
import Header from "../components/Header";
import Trending from '../components/Trending';
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";

export function FeedLayout({children}) {
    return (
        <>
            <Header/>
            <ButtomNavbar/>
            <div className='flex flex-grow bg-blue-grey-50 dark:bg-bdark-200 justify-center'>
                <main>{children}</main>
                <div>
                    <Trending />
                    <PeopleYouMightKnow/>
                </div>
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
            <div className='flex'>
                {children}
                <div className='mr-6'>
                    <Trending/>
                    <PeopleYouMightKnow/>
                </div>
            </div>
        </>
    )
}
