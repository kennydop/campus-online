import Stories from "./Stories"

function Feed() {
    return (
        <div className='h-screen overflow-y-auto mx-4'>
            <Stories />
            <div className='mt-3 bg-white p-3 rounded-lg shadow-md'>
                <div className='text-center'>
                    <input type='text'></input>
                </div>
            </div>
            
        </div>
    )
}

export default Feed
