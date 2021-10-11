import AddPost from "./AddPost"
import Posts from "./Posts"
function FeedLayout() {
    return (
        <div className='flex flex-col h-screen lg:ml-8'>
            <div className='mx-auto'>
                <AddPost />
                <Posts />
            </div>
            <div className='pt-64'></div>
        </div>
    )
}

export default FeedLayout
