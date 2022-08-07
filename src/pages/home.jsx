import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function Home() {
    const [posts, setPosts] = useState([])
    const [keyword, setKeyword] = useState('')

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const [department, setDepartment] = useState('')
    const [topic, setTopic] = useState('')
    const [loadAll, setLoadAll] = useState(false)
    const [userId, setUserId] = useState()

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        if (keyword) {
            fetch (`http://localhost:3000/api/posts/search/${keyword}`, fetchOptions)
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
    }, [keyword])

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

        if (userId) {
            fetch (`http://localhost:3000/api/posts/user/${userId}`, fetchOptions)
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
    }, [userId])

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
            <Header
                handleDrawerToggle={handleDrawerToggle}
                setKeyword={setKeyword} 
            />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                setDepartment={setDepartment}
                setLoadAll={setLoadAll} 
            />
            <Outlet context={[posts, setPosts, department, setDepartment, topic, setTopic, loadAll, userId, setUserId]}/>
        </>
    )
}