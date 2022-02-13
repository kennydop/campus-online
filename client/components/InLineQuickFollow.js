/* eslint-disable @next/next/no-html-link-for-pages */
import ProfileToFollow from "../components/ProfileToFollow"
import { useUtils } from "../contexts/UtilsContext";

function InLineQuickFollow() {
  const { suggestions } = useUtils()

  return (
    (suggestions && suggestions?.length !== 0) ?
    <div className="overflow-hidden w-screen md:w-102 lg:hidden">
      <div className="flex justify-between items-center mx-1.5 mb-1">
        <div className="text-gray-500 dark:text-gray-400 font-semibold">Quik Follow</div>
        <a href='/suggestions' className="text-pink-500 text-sm cursor-pointer">See All</a>
      </div>
      <div className="flex hide-scrollbar overflow-x-auto">
      {
        suggestions.slice(0, 9).map(suggestion => (
        <ProfileToFollow page key={suggestion._id} id={suggestion._id} username={suggestion.username} name={suggestion.name} pic={suggestion.profilePicture} college={suggestion.college} il/>
        ))
      }
      </div>
  </div>
    :
    <></>
  )
}

export default InLineQuickFollow
