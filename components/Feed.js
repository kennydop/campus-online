import AddPost from "./AddPost"
import Stories from "./Stories"
// import Posts from "./Posts"
function Feed() {
    return (
        <div className='flex flex-grow h-screen overflow-y-auto'>
            <div className='mx-auto'>
                <Stories />
                <AddPost />
                {/* <Posts /> */}
            </div>
        </div>
    )
}

export default Feed
