/* eslint-disable react-hooks/rules-of-hooks */
import {useRouter} from 'next/router';

function notAuthorized() {
    const router = useRouter();
    return (
    <div className = 'h-screen flex flex-col items-center justify-center dark:bg-bdark-200'>
        <p className = 'text-3xl md:text-4xl font-bold self-center mb-8 text-gray-500 dark:text-gray-400'>Not Authorized</p>
        <button className = 'infobutton' onClick={()=>router.replace('/')}>Login</button>
    </div>
    )
}

export default notAuthorized
