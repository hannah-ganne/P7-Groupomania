import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Feed from '../pages/feed'
import { Outlet } from 'react-router-dom'

export default function Home() {
    const [isSidebarShown, setIsSidebarShown] = useState(false)
    const [isSignedIn, setIsSignedIn] = useState(true)

    function toggleSidebar() {
        setIsSidebarShown(prevState => !prevState)
    }

    return (
        <>
            <Sidebar className="sidebar" isSidebarShown={isSidebarShown} />
            <Header toggleSidebar={toggleSidebar} />
            <Outlet />
        </>
    )
}