import {useRouter} from 'next/router';
import {db, firebaseApp} from '../firebase/firebase';
import { useState, useEffect } from 'react';
import NotAuthorized from '../components/NotAuthorized';
import {useUser} from '../firebase/useUser';
import { useAuth } from '../firebase/AuthContext';

function AddCollege({colleges}) {
    const {currentUser} = useAuth();
    const router = useRouter();
    const [college, setCollege] = useState("");
    const [filledColleges, setfilledColleges] = useState(false)
    const {user} = useUser();

    function fillColleges(){
        colleges.forEach(col => {
                if(!filledColleges){
                var collegeOption = document.createElement("option");
                collegeOption.innerHTML = col;
                document.getElementById('colleges').appendChild(collegeOption)
                setCollege('Academic City University College')
                setfilledColleges(true);
            }
        });
    }
    useEffect(()=>{
        fillColleges();
    },[])
    async function confirmCollege(){
        if(college){
            db.collection("users").doc(user.id).set({college: college, username: currentUser.displayName, email: currentUser.email, provider: currentUser.provider});
            const collegeRef = db.collection('universities').doc(college);
            const increment = firebaseApp.firestore.FieldValue.increment(1);
            collegeRef.update({ registeredUsers: increment });
            router.replace('/'); 
        }else{
            alert('Please select your college');
        }
    }
    return (
        <main>
        {/* {currentUser && ( */}
            <div className = "h-screen flex flex-col items-center justify-center dark:bg-bdark-100">
                <div className = "mb-10"><h1 className = "text-lg font-bold text-gray-500 dark:text-gray-400">Finish Setting up your Account</h1></div>
                <div className = "bg-white dark:bg-bdark-200 rounded-full space-between justify-center text-center">
                    <label className = "text-gray-500 dark:text-gray-400 mx-4" /*onClick={fillColleges}*/> Select College:
                        <select id = 'colleges' value={college} onChange = {e=>setCollege(e.target.value)} required = "required" className = "bg-white dark:bg-bdark-200 text-gray-500 dark:text-gray-400 h-11 w-40 md:w-60 outline-none pl-4">
                            <option>University of Cape Coast</option>
                            <option>Kwame Nkrumah University Of Science and Technology</option>
                            <option>University of Ghana</option>
                        </select>
                    </label>
                </div>
                <div className = "mt-6">
                    <button type = "button" className = "infobutton" onClick={confirmCollege}>Confirm</button>
                </div>
            </div>
            )
        {/* )}
        {!currentUser &&(
            <NotAuthorized />
            )
        } */}
    </main>
    )
}
export async function getStaticProps() {
    var colleges = new Array();
    await db.collection("universities").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            colleges.push(doc.id);
        });
    });

    return {
        props: {
            colleges,
        },
    }
}

export default AddCollege