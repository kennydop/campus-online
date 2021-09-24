function HeaderIcon({Icon, active}) {
    return (
           <Icon className = {`cursor-pointer h-6 px-2 md:px-3 text-center mx-auto text-gray-500 hover:text-pink-500 ${active === true && 'text-pink-500'}`}/> 
    )
}

export default HeaderIcon