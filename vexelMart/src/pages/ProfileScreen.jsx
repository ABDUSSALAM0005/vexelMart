import React from 'react'
import { Outlet } from 'react-router-dom' // 1. Import Outlet
import Sidebar from '../components/ui/SideBar'

const ProfileScreen = () => {
  return (
    <div className='grid md:grid-cols-5'> {/* Added min-h-screen for full height */}

        {/* Sidebar takes 1 share of the width */}
        <div className='md:col-span-1'>
             <Sidebar />
        </div>

        {/* Dynamic Content takes 4 shares */}
        <div className='px-4 py-6 md:px-16 md:col-span-4'>
            {/* 2. Outlet renders the component based on the URL */}
            <Outlet />
        </div>

    </div>
  )
}

export default ProfileScreen