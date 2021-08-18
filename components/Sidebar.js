function Sidebar() {
    return (
<div className='h-screen bg-blue-grey-50 inset-y-0 left-0 w-1/4 hidden md:flex md:flex-col '>
    <div className='mt-3 px-4 py-2 w-11/12 self-center bg-white rounded-xl shadow-md'>
        <div className='border-b p-2 text-gray-500 text-center font-bold'>
            <p>Trending</p>
        </div>
        <div>
            <div className='border-b px-2 py-4 text-gray-500 cursor-pointer'>
                <p>#FixTheCountry</p>
            </div>
            <div className='border-b px-2 py-4 text-gray-500 cursor-pointer'>
                <p>UTAG</p>
            </div>
            <div className='border-b px-2 py-4 text-gray-500 cursor-pointer'>
                <p>Kwesi Arthur</p>
            </div>
            <div className='border-b px-2 py-4 text-gray-500 cursor-pointer'>
                <p>#CITSA</p>
            </div>
            <div className='border-b px-2 py-4 text-gray-500 cursor-pointer'>
                <p>FPL</p>
            </div>
            <div className='p-2 text-center text-pink-500  cursor-pointer'>
                <p>More</p>
            </div>
        </div>
    </div>
</div>
    )
}

export default Sidebar
