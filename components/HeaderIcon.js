function HeaderIcon({Icon, active}) {
    return (
        <Icon className = {`cursor-pointer h-6 px-2 md:px-3 text-center mx-auto hover:text-pink-500 ${active === true ? 'text-pink-500': 'text-gray-500 dark:text-gray-400'}`}/> 
    )
}

export default HeaderIcon