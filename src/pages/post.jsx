import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
// import Avatar from '../components/Avatar'
import Avatar from '@mui/material/Avatar'
import DropdownMenu from '../components/DropdownMenu'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../utils/style/post.css'
import Button from '../components/Button'
import Comment from '../components/Comment'
import useFetch from '../utils/hooks/useFetch'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';

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
                <DropdownMenu
                    button={(<Avatar />)}
                    menuIcon1={(<AccountCircleIcon />)} 
                    menuName1='View profile'
                    menuIcon2={(<EmailIcon />)}
                    menuName2='Send email'
                />
                <p>by <span className="bold">{data.post.user.firstName}</span> from <span className="bold">{data.post.user.department}</span> on {data.post.createdAt.slice(0,10)}</p>
                </div>
                <DropdownMenu
                    button={(<MoreVertIcon />)}
                    menuIcon1={(<EditIcon />)} 
                    menuName1='Edit post'
                    menuIcon2={(<DeleteIcon />)}
                    menuName2='Delete post'
                />       
            </div>
            <div className="post-contents">
                <img src={data.post.imageUrl} alt="main image of the post" />
                <p>{data.post.description}</p>
            </div>
            <div className="like">
                <div>
                    <ThumbUpIcon fontSize='small' />
                    <span className="bold">{data.likesCount}</span>
                </div>    
                <div>
                    <ThumbDownIcon fontSize='small'/>
                    <span className='bold'>{data.dislikesCount}</span>
                </div>    
            </div>
            <div className="comments">
                <div className="comment-input">
                    <Avatar />
                    <input type="text" placeholder='Leave a comment'></input>
                    <Button className="btn red" name="send" />
                </div>
                    {data.post.comments.map(comment => {
                    return <Comment userName={comment.user.firstName} comment={comment.comment} imageUrl={comment.user.imageUrl} />
                })}
            </div>
        </section>}
        </>
    )
}