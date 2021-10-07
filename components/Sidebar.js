import Trend from "./Trend"

function Sidebar() {
    return (
<div className='p-2 hidden lg:block lg:w-1/4 ml-12 sticky top-0'>
    <div className='mt-3 p-2 self-center bg-white dark:bg-bdark-100 rounded-xl shadow-md '>
        <div className='border-b dark:border-bdark-200 p-2 text-gray-500 dark:text-gray-400 text-center font-bold'>
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
