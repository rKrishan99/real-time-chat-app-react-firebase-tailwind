import React from 'react'
import { useUserStore } from '../../../lib/userStore';

const UserInfo = () => {

  const { currentUser } = useUserStore();

  return (
    <div className='p-10 flex items-center justify-between'>
        <div className='flex items-center gap-8'>
            <img className='w-10 h-10 rounded-full object-cover' src={currentUser.avatar || "./avatar.png"} alt="" />
           <h2>{currentUser.username}</h2>
        </div>
        <div className='flex gap-4'>
            <img className='w-4 h-4' src="./moreIcon.svg" alt="" />
            <img className='w-4 h-4' src="./videoIcon.svg" alt="" />
            <img className='w-4 h-4' src="./editIcon.svg" alt="" />
        </div>
    </div>
  )
}

export default UserInfo;