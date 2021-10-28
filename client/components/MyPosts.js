/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '../firebase/firebase';
import Post from './Post';
import FlipMove from 'react-flip-move';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';

function MyPosts() {
    const { currentUser } = useAuth();
    const [myPosts, setMyPosts] = useState([]);

    useEffect(()=>{
        db.collection('posts').where("author", "==", currentUser.uid).orderBy("timestamp", "desc").get().then((querrySnapshot)=>{
            setMyPosts(querrySnapshot.docs)
        })
    }, [])
    return (
        <FlipMove>
            {myPosts?.map((post)=>(
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

export default MyPosts
