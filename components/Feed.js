import AddPost from "./AddPost"
import Stories from "./Stories"
function Feed() {
    return (
        <div className='h-screen overflow-y-auto flex flex-grow'>
            <div className='mx-auto justify-left'>
                <Stories />
                <AddPost />
            </div>
        </div>
    )
}

export default Feed
