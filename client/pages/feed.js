import FeedContent from "../components/FeedContent";
import Stories from "../components/Stories";
import { FeedLayout } from "../Layouts/Layouts";

function Feed() {
    
    return (
        <div>
            <Stories />
            <FeedContent />
        </div>
    )
}
Feed.getLayout = function getLayout(page) {
    return (
        <FeedLayout>
            {page}
        </FeedLayout>
    )
}
export default Feed
