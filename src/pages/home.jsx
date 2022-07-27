import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import useFetch from '../utils/hooks/useFetch'
const drawerWidth = 300;

export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
            }
        }

        fetch(`http://localhost:3000/api/posts/all/0`, fetchOptions)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    function handleFilter(department) {

        const fetchOptions = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
            },
            body: {"department" : department}
        }

        fetch('http://localhost:3000/api/posts/filter/department', fetchOptions)
            .then(res => res.json())
            .then(data => setPosts(data))
    }
    
    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            <Outlet context={[posts, setPosts]}/>
        </>
    )
}
// import { useEffect, useState } from 'react'
// import Sidebar from '../components/Sidebar'
// import Header from '../components/Header'
// import { Outlet } from 'react-router-dom'
// import useFetch from '../utils/hooks/useFetch'

// export default function Home() {
//     const [isSidebarShown, setIsSidebarShown] = useState(false)
//     const [posts, setPosts] = useState([])

//     function toggleSidebar() {
//         setIsSidebarShown(prevState => !prevState)
//     }

//     useEffect(() => {
//         const fetchOptions = {
//             method: "GET",
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
//             }
//         }

//         fetch('http://localhost:3000/api/posts', fetchOptions)
//             .then(res => res.json())
//             .then(data => setPosts(data))
//     }, [])

//     function handleFilter(department) {

//         const fetchOptions = {
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
//             },
//             body: {"department" : department}
//         }

//         fetch('http://localhost:3000/api/posts/filter/department', fetchOptions)
//             .then(res => res.json())
//             .then(data => setPosts(data))
//     }
    
//     return (
//         <>
//             <Sidebar className="sidebar" isSidebarShown={isSidebarShown} handleFilter={handleFilter} />
//             <Header toggleSidebar={toggleSidebar} />
//             <Outlet context={[posts, setPosts]}/>
//         </>
//     )
// }