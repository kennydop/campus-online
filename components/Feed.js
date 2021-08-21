import AddPost from "./AddPost"
import Stories from "./Stories"
// import Posts from "./Posts"
function Feed() {
    return (
        <div className='flex flex-grow flex-col h-screen overflow-y-auto'>
            <div className='mx-auto'>
                <Stories />
            </div>
            <div className='mx-auto'>
                <AddPost />
            </div>
                {/* <Posts /> */}
        </div>
    )
}

export default Feed
