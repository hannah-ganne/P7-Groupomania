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

    const [department, setDepartment] = useState('')
    const [topic, setTopic] = useState('')
    const [loadAll, setLoadAll] = useState(false)

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        if (department) {
            fetch (`http://localhost:3000/api/posts/department/${department}`, fetchOptions)
            .then (res =>  {
                if(res.ok) {
                    return res.json();
                }
                throw new Error("There's an error sending the data")
            })
            .then (data => {
                setPosts(data)
            })
            .catch(err => console.log(err)); 
        }
    }, [department])

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        if (topic) {
            fetch (`http://localhost:3000/api/posts/topic/${topic}`, fetchOptions)
            .then (res =>  {
                if(res.ok) {
                    return res.json();
                }
                throw new Error("There's an error sending the data")
            })
            .then (data => {
                setPosts(data)
            })
            .catch(err => console.log(err)); 
        }
    }, [topic])

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        fetch ('http://localhost:3000/api/posts', fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            setPosts(data)
        })
        .catch(err => console.log(err)); 
    }, [loadAll])
    
    return (
        <>
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                setDepartment={setDepartment}
                setLoadAll={setLoadAll} 
            />
            <Outlet context={[posts, setPosts, department, setDepartment, topic, setTopic, loadAll]}/>
        </>
    )
}