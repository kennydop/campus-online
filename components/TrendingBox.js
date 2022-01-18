import Link from "next/link"
import { useUtils } from "../contexts/UtilsContext"

function TrendingBox() {
  const {trending} = useUtils()
  return (
    <div className='hidden lg:block h-full sticky top-20 my-2 mr-6 mt-3 p-2 bg-white dark:bg-bdark-100 rounded-lg shadow-md w-tt'>
      <div className='border-b dark:border-bdark-200 p-2 text-gray-500 dark:text-gray-400 text-center font-bold'>
        <p>Trending</p>
      </div>
      {trending ?
      <div>
        {trending?.map((t)=>
        <Link href={`/trending?word=${t.word}`} key={t.word}>
          <div className='border-b dark:border-bdark-200 px-2 py-4 text-gray-500 dark:text-gray-400 cursor-pointer hover:translate-x-1 duration-200'>
            <p>{t.word}</p>
          </div>
        </Link>
        )}
      </div>
      :
      <div className="h-72 w-full"/>
      }
    </div>
  )
}

export default TrendingBox
