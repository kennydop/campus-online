import Feed from "../components/Feed";
import Trending from "../components/Trending";
import Stories from "../components/Stories";
import SiteLayout from "../components/SiteLayout";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";

function campusonline() {

    return (
            <div className='flex flex-grow w-screen justify-center overflow-y-scroll'>
                <Trending />
                <div>
                <Stories />
                <Feed />
                </div>
                <PeopleYouMightKnow/>
            </div>
    )
}
campusonline.getLayout = function getLayout(page) {
    return (
        <SiteLayout>
            {page}
        </SiteLayout>
    )
}
export default campusonline
