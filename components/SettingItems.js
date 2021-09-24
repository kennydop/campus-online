function SettingItems({Icon, title,}) {
    return (
        <div className='text-center items-center cursor-pointer hover:bg-gray-200 flex py-2'>
            <Icon className = "h-8 px-4 text-center justify-right text-gray-500"/>
            <p className = 'text-gray-500'>{title}</p>
        </div>
    )
}

export default SettingItems
