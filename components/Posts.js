import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase/firebase';
import Post from './Post';
import FlipMove from 'react-flip-move';
import PostPlaceholder from './PostPlaceholder';

function Posts() {
    console.log('made a request for realtime posts from posts')
    const [realtimePosts, loading, error] = useCollection( db.collection("posts").orderBy("timestamp", "desc"));
    return (
        realtimePosts && realtimePosts?.docs.length !== 0 ?
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
        :
        <>
        <PostPlaceholder type={'text'}/>
        <PostPlaceholder type={'image'}/>
        <PostPlaceholder type={'image'}/>
        </>
    )
}

export default Posts
