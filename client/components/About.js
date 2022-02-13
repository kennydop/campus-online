import { DocumentTextIcon, HeartIcon, CakeIcon, TemplateIcon, AcademicCapIcon } from '@heroicons/react/solid'
import { GenderIcon } from '../images/defaults'

function About({ admin, user }) {
	return (
		<div className='md:mx-auto w-full md:w-8/12 bg-white dark:bg-bdark-100 shadow-md rounded-lg cursor-default'>
			<div className='text-gray-500 dark:text-gray-400 py-3 pl-4 border-b dark:border-bdark-50'>About</div>
			{ (user.birthday || user.relationship || user.level || user.description) ?
      <>
      {user.description && 
      <div className="text-gray-500 dark:text-gray-400 py-3 px-10 border-b dark:border-bdark-50 whitespace-pre-wrap">
        <div className='flex items-center space-x-3 mb-4'>
          <div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
            <DocumentTextIcon className='h-7 text-green-500'/>
          </div>
          <p>Bio</p>
        </div>
        <div>
          {user.description}
        </div>
      </div>}
			<div className='grid md:grid-cols-2 grid-cols-1 p-6'>
				{user.birthday && 
				<div className='flex items-center justify-start mb-2 pl-3 h-12 space-x-3 rounded-lg'>
					<div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
							<CakeIcon className='h-7 text-yellow-500'/>
					</div>
					<div className='text-gray-500 dark:text-gray-400'>Born on {user.birthday.slice(0, 12).trim()}</div>
				</div>}
				{user.gender && 
				<div className='flex items-center justify-start mb-2 pl-3 h-12 space-x-3 rounded-lg'>
					<div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
            <GenderIcon gender={user.gender} className={`h-7 ${user.gender === 'Female' ? 'text-pink-500' : 'text-blue-500'}`}/>
					</div>
					<div className='text-gray-500 dark:text-gray-400'>{user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}</div>
				</div>}
				{user.relationship && 
				<div className='flex items-center justify-start mb-2 pl-3 h-12 space-x-3 rounded-lg'>
					<div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
							<HeartIcon className='h-7 text-red-500'/>
					</div>
					<div className='text-gray-500 dark:text-gray-400'>{user.relationship}</div>
				</div>}
				{(user.posts !== 0) && 
				<div className='flex items-center justify-start mb-2 pl-3 h-12 space-x-3 rounded-lg'>
					<div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
            <TemplateIcon className='h-7 text-purple-500'/>
					</div>
					<div className='text-gray-500 dark:text-gray-400'>{user.posts === 1 ? `${user.posts} Post` : `${user.posts} Posts`}</div>
				</div>}
				{user.level && 
				<div className='flex items-center justify-start mb-2 pl-3 h-12 space-x-3 rounded-lg'>
					<div className='h-10 w-10 rounded-full bg-gray-100 dark:bg-bdark-50 flex items-center justify-center'>
						<AcademicCapIcon className='h-7 text-gray-600'/>
					</div>
					<div className='text-gray-500 dark:text-gray-400 truncate'>{user.level} at {user.college}</div>
				</div>}
			</div>
      </>
			:
			<div className="text-gray-500 dark:text-gray-400 py-3 pl-3 md:text-left text-center">{admin ? 'Finish setting up your profile, click "Edit Profile"' : 'Nothing to show'}</div>
			}
		</div>
	)
}

export default About
