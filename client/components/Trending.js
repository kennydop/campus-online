import Trend from "./Trend"

function Trending() {
    return (
        <div className='hidden lg:block m-2 mt-3 p-2 bg-white dark:bg-bdark-100 rounded-lg shadow-md w-72'>
            <div className='border-b dark:border-bdark-200 p-2 text-gray-500 dark:text-gray-400 text-center font-bold'>
                <p>Trending</p>
            </div>
            <div>
                <Trend trend='#FixTheCountry' />
                <Trend trend='Kwesi Arthur' />
                <Trend trend='UTAG' />
                <Trend trend='Coro Dash' />
                <Trend trend='#CITSA' />
                <div className='p-2 text-center text-pink-500  cursor-pointer hover:font-bold'>
                    <p>More</p>
                </div>
            </div>
        </div>
    )
}

export default Trending
