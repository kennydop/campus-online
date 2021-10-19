import {useRouter} from 'next/router';
import {db, firebaseApp} from '../firebase/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { AcademicCapIcon } from '@heroicons/react/outline';

function AddCollege({colleges}) {
    const {currentUser} = useAuth();
    const router = useRouter();
    const [college, setCollege] = useState("");
    const [error, setError] = useState("");
    const [filledColleges, setfilledColleges] = useState(false);
    const [confirmCollegeLoading, setconfirmCollegeLoading] = useState(false);

    useEffect(()=>{
        if(college){
            fillColleges();
        }else{
            refillColleges()
        }
    },[])
    async function refillColleges(){
        if(!filledColleges){
            var colleges = new Array();
            await db.collection("universities").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                    var collegeOption = document.createElement("option");
                    collegeOption.innerHTML = doc.id;
                    document.getElementById('colleges').appendChild(collegeOption)
                    setfilledColleges(true);
                });
            });
        }
    }
    function fillColleges(){
        colleges.forEach(col => {
                if(!filledColleges){
                var collegeOption = document.createElement("option");
                collegeOption.innerHTML = col;
                document.getElementById('colleges').appendChild(collegeOption)
                setfilledColleges(true);
            }
        });
    }

    async function confirmCollege(){
        setconfirmCollegeLoading(true)
        setError("")
        if(college){
            if(college === "Select College"){
                setError('Please select your college');
                setconfirmCollegeLoading(false);
                return;
            }
            await db.collection("users").doc(currentUser.uid).set({college: college, username: currentUser.displayName, email: currentUser.email, profilePic: currentUser.photoURL, phone: currentUser.phoneNumber});
            const collegeRef = db.collection('universities').doc(college);
            const increment = firebaseApp.firestore.FieldValue.increment(1);
            await collegeRef.update({ registeredUsers: increment });
            router.replace('/');
        }else{
            setError('Please select your college');
            setconfirmCollegeLoading(false);
        }
    }

    return (
        <div className = "h-screen flex flex-col items-center justify-center dark:bg-bdark-100">
            <div className = "mb-10"><h1 className = "text-lg font-bold text-gray-500 dark:text-gray-400">Finish Setting up your Account</h1></div>
                {error&&<p className='errorMsg'>{error}</p>}
            <div className = "bg-blue-grey-50 dark:bg-bdark-200 rounded-full justify-center h-12 w-80 mb-5 p-1">
                <label htmlFor='colleges' className='flex w-full h-full justify-end'>
                    <AcademicCapIcon className="text-gray-500 dark:text-gray-400 w-6 text-center mx-2"/>
                    <select id = 'colleges' value={college} onChange = {e=>setCollege(e.target.value)} required = "required" className = "bg-blue-grey-50 dark:bg-bdark-200 text-gray-500 dark:text-gray-400"><option>Select College</option></select>
                </label>
            </div>
            <div className = "mt-6">
                <button disabled={confirmCollegeLoading} type = "button" className = "infobutton" onClick={confirmCollege}>
                    {confirmCollegeLoading ? <div className="loader mx-auto animate-spin"></div> : <>Confirm</>}
                </button>
            </div>
        </div>
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