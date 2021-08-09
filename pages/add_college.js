import {useRouter} from 'next/router';
import {db, auth, firebaseApp} from '../firebase/firebase';
import { useState, useEffect } from 'react';
import {useSession, getSession} from 'next-auth/client';
import NotAuthorized from '../components/notAuthorized';

function add_college({colleges}) {
    const router = useRouter();
    const [college, setCollege] = useState("");
    const [session, loading] = useSession();

    function fillColleges(){
        var alreadyAdded = Array.from(document.querySelectorAll('#colleges option'));
        colleges.forEach(col => {
                if(alreadyAdded.length===0){
                var collegeOption = document.createElement("option");
                collegeOption.innerHTML = col;
                document.getElementById('colleges').appendChild(collegeOption)
            }
        });
    }

    async function confirmCollege(){
        db.collection("users").doc(auth.currentUser.uid).set({college: college});
        const collegeRef = db.collection('universities').doc(college);
        const increment = firebaseApp.firestore.FieldValue.increment(1);
        collegeRef.update({ registeredUsers: increment });
        router.push('/add_profile_image'); 
    }
    return (
        <main>
        {session && ( 
        <div className = "h-screen flex flex-col items-center justify-center">
            <div className = "mb-10"><h1 className = "text-lg font-bold text-gray-500">Finish Setting up your Account</h1></div>
            <div className = "bg-gray-100 rounded-full space-between justify-center text-center">
                <label className = "text-gray-500 mx-4" onClick={fillColleges}> Select College:
                    <select id = 'colleges' value={college} onChange = {e=>setCollege(e.target.value)} required = "required" className = "bg-gray-100 text-gray-500 h-12 w-40 md:w-60 outline-none pl-4">
                    </select>
                </label>
            </div>
            <div className = "mt-6">
             <button type = "button" className = "infobutton" onClick={confirmCollege}>Confirm</button>
            </div>
        </div>
        )}
        {!session &&(
            !loading &&
            <NotAuthorized />
        )}
    </main>
    )
}

  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    var colleges = new Array();
    await db.collection("universities").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            colleges.push(doc.id);
        });
    });
    console.log(colleges)
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
        colleges,
      },
    }
  }

export default add_college
