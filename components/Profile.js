function Sidebar({pp, name, email}) {

    return (
            <div className='h-screen bg-blue-grey inset-y-0 left-0 w-1/4 hidden md:flex md:flex-col '>
                <div className='mt-8 self-center'>
                    <img className = "h-20 w-20 object-cover rounded-full cursor-pointer text-center" src = {pp}/>
                </div>
                <div>
                    <p className = 'text-center  text-xl font-bold'>{name}</p>
                    <p className = 'text-center  text-xs font-light'>{email}</p>
                </div>
                <div className='flex flex-row self-center mt-3 w-full justify-evenly px-6 py-2'>
                    <div className = 'flex flex-col'>
                        <p className = 'text-center  text-lg font-medium'>100</p>
                        <p className = 'text-center  text-xs font-light'>Posts</p>
                    </div>
                    <div className='border-r border-gray-300 h-6 self-center justify-center'></div>
                    <div className = 'flex flex-col'>
                        <p className = 'text-center  text-lg font-medium'>5.4k</p>
                        <p className = 'text-center  text-xs font-light'>Followers</p>
                    </div>
                    <div className='border-r border-gray-300 h-6 self-center justify-center'></div>
                    <div className = 'flex flex-col'>
                        <p className = 'text-center  text-lg font-medium'>1</p>
                        <p className = 'text-center text-xs font-light'>Following</p>
                    </div>
                </div>
            </div>
    )
}

export default Sidebar
