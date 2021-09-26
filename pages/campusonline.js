import ButtomNavbar from "../components/ButtomNavbar";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import {signOut, useSession} from "next-auth/client";
import Stories from "../components/Stories";
import Settings from "../components/Settings"


function campusonline() {

    return (
        <div>
            <div>
                <Header />
                <ButtomNavbar />
            </div>
            <div className='flex flex-grow w-screen justify-center lg:justify-start overflow-y-scroll'>
                <Sidebar />
                <div>
                <Stories />
                <Feed />
                </div>
            </div>
        </div>
    )
}

export default campusonline
