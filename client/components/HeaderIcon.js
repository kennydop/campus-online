function HeaderIcon({Icon, active, unread}) {
  return (
    <div className="fit-content relative">
      <Icon className = {`cursor-pointer h-6 px-3 text-center mx-auto hover:text-pink-500 ${active === true ? 'text-pink-500': 'text-gray-500 dark:text-gray-400'}`}/> 
      {unread && <div className="absolute h-4 w-4 rounded-full -top-1 right-1 bg-pink-500 text-xxs cursor-default text-center text-white dark:text-gray-200">{unread}</div>}
    </div>
  )
}

export default HeaderIcon