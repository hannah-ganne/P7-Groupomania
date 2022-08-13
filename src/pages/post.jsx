import { useState, useEffect, useMemo } from 'react'
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
import { useOutletContext } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';

export default function Post() {
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);

    function sendEmail(email) {
        window.location.replace(`mailto:${email}`)
    }

    const [comment, setComment] = useState('')
    const [posts, setPosts, department, setDepartment, topic, setTopic] = useOutletContext();

    let { id } = useParams();

    const { data, setData, error, loading } = useFetch('GET', `http://localhost:3000/api/posts/${id}`)

    function handleLike(event) {

        const {id: buttonId} = event.currentTarget

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
            },
            body: JSON.stringify({ "like": +buttonId })
        }

        fetch(`http://localhost:3000/api/posts/${id}/like`, fetchOptions)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })
    }

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
        if (department) {
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
        .then(data => {
            document.location.href = './';
        })
        .catch(err => console.log(err)); 
    }

    function deleteComment(commentId) {
        const fetchOptions = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`
            }
        }

        fetch (`http://localhost:3000/api/posts/${id}/comment/${commentId}`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
        .then(data => {
            document.location.href = `/post/${id}`;
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
            body: JSON.stringify({"comment": comment})
        }

        fetch (`http://localhost:3000/api/posts/${id}/comment`, fetchOptions)
        .then (res =>  {
            if(res.ok) {
                return res.json();
            }
            throw new Error("There's an error sending the data")
        })
            .then(data => {
            document.location.href = `/post/${id}`;
        })
        .catch(err => console.log(err)); 
    }

    if (error) {
        console.log(error)
    } 

    return (
        <>
            {loading && <div>Loading...</div>}
            {data && <section className='post'>
            <Link onClick={() => setDepartment(data.post.user.department)} to='/'>
                <small className='bold'>{data.post.user.department.toUpperCase()}</small>
            </Link>
            <span> | </span>    
            <Link onClick={() => setTopic(data.post.topic)} to='/'>
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
                    menuOnClick2={() => sendEmail(data.email)}        
                    menuLink2={'#'}
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
                <p>by <span className='bold'>{data.post.user.firstName}</span> from <span className='bold'>{data.post.user.department}</span> on {new Date(data.post.createdAt).getDate() + '/' + (new Date(data.post.createdAt).getMonth() + 1) + '/' + new Date(data.post.createdAt).getFullYear()}</p>
                </div>
                    {
                        (data.post.userId === JSON.parse(sessionStorage.getItem("userId")) || JSON.parse(sessionStorage.getItem("isAdmin")))
                        && (
                        <DropdownMenu
                        button={(<MoreVertIcon />)}
                        menuIcon1={(<EditIcon />)} 
                        menuName1='Edit post'
                        menuLink1='./edit'
                        menuIcon2={(<DeleteIcon />)}
                        menuName2='Delete post'
                        menuOnClick2={deletePost}
                        menuLink2='/'
                        />)
                    }                    

            </div>
            <div className='post-contents'>
                {data.post.imageUrl && <img src={data.post.imageUrl} alt="user selected file" />}
                <p>{data.post.description}</p>
            </div>
            <div className='like'>
                <div>
                    <IconButton id='1' onClick={handleLike} >
                        <ThumbUpIcon fontSize='small' color={data.alreadyLiked === 1 ? 'success' : 'neutral'} />    
                    </IconButton>
                    <span className='bold'>{data.likesCount}</span>
                </div>    
                <div>
                    <IconButton id='-1' onClick={handleLike} >
                        <ThumbDownIcon fontSize='small' color={data.alreadyLiked === -1 ? 'error' : 'neutral'}/>
                    </IconButton>        
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
                    return <Comment
                        key={comment.id}
                        id={comment.id}
                        userName={comment.user.firstName}
                        comment={comment.comment}
                        imageUrl={comment.user.imageUrl} 
                        deleteComment={deleteComment}
                        userId={comment.userId}
                    />    
                    })}
            </div>
        </section>}
        </>
    )
}