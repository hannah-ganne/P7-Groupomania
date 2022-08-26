// import Avatar from './Avatar'
import Tag from './Tag'
import '../utils/style/Card.css'
import { Link } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'

export default function Card({ id, title, firstName, department, imageUrl, createdAt, description, topic, likesCount, commentsCount, setDepartment, setTopic }) {

    const date = new Date(createdAt)
    const dateCreated = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear()

    return (
        <article>
            <Link to={`/post/${id}`}>
                <Avatar className="avatar" sx={{ width: 75, height: 75 }} src={imageUrl} alt="post owner's avatar"/>
            </Link>
            <div className="item--text">
                <Link to={`/post/${id}`}>
                    <h3>{title}</h3>
                    <p className="item--text--data">
                        <span className="bold">{firstName}</span> from <span className="bold">{department}</span> posted on {dateCreated}
                    </p>
                    <p className="item--description">{description}</p>
                </Link>
                <div className="tags">
                    <Tag tagType="department" name={department} setDepartment={setDepartment} />
                    <Tag tagType="topic" name={topic} setTopic={setTopic} />
                </div>
            </div>    
            <div className="item--stats">
                <p><span className="bold">{likesCount}</span> {likesCount <= 1 ? 'like' : 'likes'}</p>
                <p><span className="bold">{commentsCount}</span> {commentsCount <= 1 ? 'comment' : 'comments'}</p>
            </div>
        </article>
    )
}