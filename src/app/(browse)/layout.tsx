import React from 'react'
import Navbar from './_components/Navbar'
import Sidebar from './_components/Sidebar'

const BrowseLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
    <Navbar />
    <div className="flex h-full pt-20">
       <Sidebar />
        {children}
    </div>

    </>
  )
}

export default BrowseLayout