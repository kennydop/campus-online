import ButtomNavbar from "../components/ButtomNavbar";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import {signOut, useSession} from "next-auth/client";
import RightSpace from "../components/RightSpace"
import Stories from "../components/Stories";


function campusonline() {

    // const [session] = useSession();
    // var pp = null;
    // if(session.user.image){
    //     if(session.user.image === 'null'){
    //         pp = 'https://i.pinimg.com/474x/01/6a/80/016a8077b311d3ece44fa4f5138c652d.jpg'
    //     }else{
    //     pp = session.user.image
    //     }
    // }
    // else{
    //     pp = 'https://i.pinimg.com/474x/01/6a/80/016a8077b311d3ece44fa4f5138c652d.jpg'
    // }

    return (
        <div>
            <div>
                <Header />
                <ButtomNavbar />
            </div>
            <div className='flex flex-grow  w-screen justify-center lg:justify-start'>
                <Sidebar />
                <div className='overflow-y-auto'>
                <Stories />
                <Feed />
                </div>
            </div>
        </div>
    )
}

export default campusonline
