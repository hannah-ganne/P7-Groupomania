import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function Home() {

    const avatarUrl = JSON.parse(sessionStorage.getItem('imageUrl'))

    const [posts, setPosts] = useState([])
    const [keyword, setKeyword] = useState('')
        useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        }

        if (keyword) {
            fetch (`http://localhost:3000/api/posts/search/${keyword}`, fetchOptions)
            .then (res =>  {
                if(res.ok) {
                    return res.json();
                }
                throw new Error(`There's an error sending the data`)
            })
            .then (data => {
                setPosts(data)
            })
            .catch(err => console.log(err)); 
        }
    }, [keyword])

    const [department, setDepartment] = useState('')
        useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        }

        if (department) {
            fetch (`http://localhost:3000/api/posts/department/${department}`, fetchOptions)
            .then (res =>  {
                if(res.ok) {
                    return res.json();
                }
                throw new Error(`There's an error sending the data`)
            })
            .then (data => {
                setPosts(data)
            })
            .catch(err => console.log(err)); 
        }
        }, [department])
    
    const [topic, setTopic] = useState('')
    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        }

        if (topic) {
            fetch (`http://localhost:3000/api/posts/topic/${topic}`, fetchOptions)
            .then (res =>  {
                if(res.ok) {
                    return res.json();
                }
                throw new Error(`There's an error sending the data`)
            })
            .then (data => {
                setPosts(data)
            })
            .catch(err => console.log(err)); 
        }
    }, [topic])
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    return (
        <>
            <Header
                handleDrawerToggle={handleDrawerToggle}
                setKeyword={setKeyword}
                avatarUrl={avatarUrl}        
            />
            <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                setDepartment={setDepartment}
                setPosts={setPosts}
            />
            <Outlet context={[posts, setPosts, department, setDepartment, topic, setTopic, avatarUrl]} />
        </>
    )
}