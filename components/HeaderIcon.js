function HeaderIcon({Icon, active}) {
    return (
           <Icon className = {`cursor-pointer sm:h-4 md:h-6 md:px-3 sm:px-2 xs:px-1 text-center mx-auto text-gray-500 hover:text-pink-500 ${active && 'text-pink-500'}`}/> 
    )
}

export default HeaderIcon