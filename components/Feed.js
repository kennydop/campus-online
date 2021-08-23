import AddPost from "./AddPost"
import Stories from "./Stories"
import Posts from "./Posts"
function Feed() {
    return (
        <div className='flex flex-col h-screen overflow-y-auto lg:ml-8'>
            <div className='mx-auto'>
                <Stories />
            </div>
            <div className='mx-auto'>
                <AddPost />
            </div>
            <div>
                <Posts />
            </div>
        </div>
    )
}

export default Feed
