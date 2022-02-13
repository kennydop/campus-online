import ButtomNavbar from "../components/ButtomNavbar";
import Header from "../components/Header";
import Trending from '../components/Trending';
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";

export function FeedLayout({children}) {
    return (
        <>
            <Header/>
            <ButtomNavbar/>
            <div className='flex flex-grow bg-blue-grey-50 dark:bg-bdark-200 justify-center h-full'>
                <Trending />
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
