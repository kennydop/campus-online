import Trend from "./Trend"

function Sidebar() {
    return (
<div className='p-2 hidden lg:block lg:w-1/4 ml-12'>
    <div className='mt-3 p-2 self-center bg-white rounded-xl shadow-md'>
        <div className='border-b p-2 text-gray-500 text-center font-bold'>
            <p>Trending</p>
        </div>
        <div>
            <Trend trend='#FixTheCountry' />
            <Trend trend='UTAG' />
            <Trend trend='Kwesi Arthur' />
            <Trend trend='#CITSA' />
            <Trend trend='FPL' />
            <div className='p-2 text-center text-pink-500  cursor-pointer hover:font-bold'>
                <p>More</p>
            </div>
        </div>
    </div>
</div>
    )
}

export default Sidebar
