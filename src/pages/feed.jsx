import Card from '../components/Card'
import '../utils/style/Feed.css'
import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Feed() {

    const [posts, setPosts, department, setDepartment, topic, setTopic] = useOutletContext();
    const [sortType, setSortType] = useState(0);

    useEffect(() => {
        const fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        fetch (`http://localhost:3000/api/posts/all/${sortType}`, fetchOptions)
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
    }, [sortType])

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

    const cardEl = posts.map(post => {
        return <Card
            key={post.id}    
            id={post.id}
            title={post.title}
            firstName={post.user.firstName}
            department={post.user.department}
            imageUrl={post.user.imageUrl}
            createdAt={post.createdAt}
            description={post.description}
            topic={post.topic}
            likesCount={post.likesCount}
            commentsCount={post.commentsCount}
            setDepartment={setDepartment}
            setTopic={setTopic}
            />
    })

    return (
    <section>
        <select className="sort-items" value={sortType} onChange={(e) => setSortType(+e.target.value)}>
            <option value="">Sort</option>
            <option value="0">Latest</option>
            <option value="1">Oldest</option>
            <option value="2">Most Popular</option>
        </select>
        <div>
            {cardEl}
        </div>
    </section>
    )
}