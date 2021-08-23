import AddPost from "./AddPost"
import Stories from "./Stories"
import Posts from "./Posts"
function Feed() {
    return (
        <div className='flex flex-col h-screen lg:ml-8'>
            <div className='mx-auto'>
                <AddPost />
                <Posts />
            </div>
        </div>
    )
}

export default Feed
