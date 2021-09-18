function SettingItems({Icon, title,}) {
    return (
        <div className=' bg-red-500 hover:bg-gray-200 flex '>
            <Icon className = "cursor-pointer h-8 pl-2 text-center justify-right text-gray-500"/>
            <p>{title}</p>
        </div>
    )
}

export default SettingItems
