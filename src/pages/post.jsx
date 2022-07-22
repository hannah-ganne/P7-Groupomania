import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar'
import Dropdown from '../components/Dropdown'
import dots from '../assets/dots.png'
import '../utils/style/post.css'
import Button from '../components/Button'
import Comment from '../components/Comment'
import useFetch from '../utils/hooks/useFetch'

export default function Post() {

    let { id } = useParams();

    const { data, error, loading } = useFetch('GET',`http://localhost:3000/api/posts/${id}`)

    if (error) {
        console.log(error)
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {data && <section className="post">
            <small className="bold">{data.post.user.department.toUpperCase()} | {data.post.topic.toUpperCase()}</small>
            <h1>{data.post.title}</h1>
            <div className="post-info-container">
                <div className="post-info">
                    <Avatar imageUrl={data.post.user.imageUrl} />
                    <p>by <span className="bold">{data.post.user.firstName}</span> from <span className="bold">{data.post.user.department}</span> on {data.post.createdAt.slice(0,10)}</p>
                </div>
                <img src={dots} className="dots" alt="three dots" />
            </div>
            <div className="post-contents">
                <img src={data.post.imageUrl} alt="main image of the post" />
                <p>{data.post.description}</p>
            </div>
            <div className="like">
                <div>
                    <i className="fa-solid fa-thumbs-up"></i>
                    <span className="bold">{data.likesCount}</span>
                </div>    
                <div>
                    <i className="fa-solid fa-thumbs-down"></i>
                    <span className='bold'>{data.dislikesCount}</span>
                </div>    
            </div>
            <div className="comments">
                <div className="comment-input">
                    <Avatar imageUrl={data.post.user.imageUrl} />
                    <input type="text" placeholder='Leave a comment'></input>
                    <Button className="btn red" name="send" />
                </div>
                <Comment />
                <Comment />
                <Comment />
            </div>
        </section>}
        </>
    )
}