import FeedLayout from "../components/FeedLayout";
import Trending from "../components/Trending";
import Stories from "../components/Stories";
import SiteLayout from "../components/SiteLayout";
import PeopleYouMightKnow from "../components/PeopleYouMightKnow";

function feed() {
    
    return (
            <div className='flex flex-grow bg-blue-grey-50 dark:bg-bdark-200 w-screen justify-center overflow-y-auto'>
                <Trending />
                <div>
                <Stories />
                <FeedLayout />
                </div>
                <PeopleYouMightKnow/>
            </div>
    )
}
feed.getLayout = function getLayout(page) {
    return (
        <SiteLayout>
            {page}
        </SiteLayout>
    )
}
export default feed
