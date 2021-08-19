import { useSession } from "next-auth/client"


function AddPost() {
    const [session] = useSession()
    return (
        <div>
            <div className='flex space-x-4 items-center'>
                <img className='rounded-full object-cover h-14 w-12' src={session.user.image}/>
                <form className='flex flex-1'>
                    <input className='outline-none bg-blue-grey-50 placeholder-gray-500 rounded-full ring-1 ring-gray-500 w-96 h-11 p-3' 
                        type='text'
                        placeholder={`What's up, ${session.user.name}?`}/>
                </form>
            </div>
        </div>
    )
}

export default AddPost
