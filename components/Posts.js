import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import Post from './Post';
import FlipMove from 'react-flip-move';
function Posts() {
    const [realtimePosts, loading, error] = useCollection( db.collection("posts").orderBy("timestamp", "desc"));
    
    return (
        <FlipMove>
            {realtimePosts?.docs.map(post => (
            <Post
                key={post.id}
                id={post.id}
                name={post.data().name}
                message={post.data().message}
                email={post.data().email}
                timestamp={post.data().timestamp}
                image={post.data().image}
                postImage={post.data().postImage}
                postType={post.data().postType}
            />))}
        </FlipMove>
    )
}

export default Posts
