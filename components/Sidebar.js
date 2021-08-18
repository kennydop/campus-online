import Trend from "./Trend"

function Sidebar() {
    return (
<div className='inset-y-0 left-0 w-1/4 hidden lg:flex lg:flex-col'>
    <div className='mt-3 px-4 py-2 w-11/12 self-center bg-white rounded-xl shadow-md'>
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
