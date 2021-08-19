import AddPost from "./AddPost"
import Stories from "./Stories"

function Feed() {
    return (
        <div className='h-screen overflow-y-auto flex flex-col'>
                <Stories />
                <AddPost />
            </div>
    )
}

export default Feed
