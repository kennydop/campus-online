import AddPost from "./AddPost"
import Posts from "./Posts"

function FeedContent() {
  return (
    <div className='flex flex-col'>
      <div className='mx-auto'>
        <AddPost />
        <Posts />
      </div>
      <div className='pt-20'></div>
    </div>
  )
}

export default FeedContent
