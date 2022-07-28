import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../utils/style/profile.css'
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
import CustomModal from '../components/CustomModal'
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

export default function Post() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);

    const [comment, setComment] = useState('')

    let { id } = useParams();

    const { data, error, loading } = useFetch('GET',`http://localhost:3000/api/posts/${id}`)

    if (error) {
        console.log(error)
    } 

    function deletePost() {

        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        fetch (`http://localhost:3000/api/posts/${id}`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            document.location.href = './';
        })
        .catch(err => console.log(err)); 
    }

    function handleSubmit(event) {
        event.preventDefault();

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            },
            body: JSON.stringify(comment)
        }

        fetch (`http://localhost:3000/api/posts/${id}/comment`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then (data => {
            document.location.href = `/post/${id}`;
        })
        .catch(err => console.log(err)); 
    }

    return (
        <>
            {loading && <div>Loading...</div>}
            {data && <section className='post'>
            <Link to='#'>
                <small className='bold'>{data.post.user.department.toUpperCase()}</small>
            </Link>
            <span> | </span>    
            <Link to='#'>
                <small className='bold'>{data.post.topic.toUpperCase()}</small> 
            </Link>
            <h1>{data.post.title}</h1>
            <div className='post-info-container'>
                <div className='post-info'>
                <DropdownMenu
                    button={(<Avatar src={data.post.user.imageUrl} />)}
                    menuIcon1={(<AccountCircleIcon />)}
                    menuName1='View profile'
                    menuOnClick1={handleOpen}
                    menuLink1='#'
                    menuIcon2={(<EmailIcon />)}
                    menuName2='Send email'
                    menuLink2={`../mailto:${data.email}`}
                />
                <CustomModal
                    modalOpen={modalOpen}
                    onModalChange={(open) => setModalOpen(open)}
                    imageUrl={data.post.user.imageUrl}
                    firstName={data.post.user.firstName}
                    lastName={data.post.user.lastName}
                    department={data.post.user.department}
                    expertIn={data.post.user.expertIn}
                    interestedIn={data.post.user.interestedIn}
                    oneWord={data.post.user.oneWord}
                    isUpFor={data.post.user.isUpFor
                            .filter(item => item.checked)}
                />
                <p>by <span className='bold'>{data.post.user.firstName}</span> from <span className='bold'>{data.post.user.department}</span> on {new Date(data.post.createdAt).getDate() + '/' + new Date(data.post.createdAt).getMonth() + '/' + new Date(data.post.createdAt).getFullYear()}</p>
                </div>
                <DropdownMenu
                    button={(<MoreVertIcon />)}
                    menuIcon1={(<EditIcon />)} 
                    menuName1='Edit post'
                    menuLink1='./edit'
                    menuIcon2={(<DeleteIcon />)}
                    menuName2='Delete post'
                    menuOnClick2={deletePost}
                    menuLink2='/'
                />       
            </div>
            <div className='post-contents'>
                <img src={data.post.imageUrl} alt='main image of the post' />
                <p>{data.post.description}</p>
            </div>
            <div className='like'>
                <div>    
                    <ThumbUpIcon fontSize='small'/>
                    <span className='bold'>{data.likesCount}</span>
                </div>    
                <div>
                    <ThumbDownIcon fontSize='small'/>
                    <span className='bold'>{data.dislikesCount}</span>
                </div>    
            </div>
            <div className='comments'>
                <form className='comment-input' onSubmit={handleSubmit}>
                    <Avatar />
                    <input
                        type='text'
                        placeholder='Leave a comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </input>
                    <Button className='btn red' name='send' type='submit'/>
                </form>
                    {data.post.comments.map(comment => {
                    return <Comment key={comment.id} userName={comment.user.firstName} comment={comment.comment} imageUrl={comment.user.imageUrl} />
                })}
            </div>
        </section>}
        </>
    )
}