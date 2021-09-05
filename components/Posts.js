import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import Post from './Post';
function Posts() {
    const [realtimePosts, loading, error] = useCollection( db.collection("posts").orderBy("timestamp", "desc"));
    
    return (
        <div>
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
                likes={post.data().likes}
                comments={post.data().comments}
            />))}
        </div>
    )
}

export default Posts
