import Avatar from './Avatar'
import Tag from './Tag'
import '../utils/style/Card.css'
import { Link } from 'react-router-dom'

export default function Card({id, title, firstName, department, imageUrl, createdAt, description, topic, likesCount, commentsCount}) {
    return (
        <article>
            <Avatar imageUrl={imageUrl} />
            <div className="item--text">
                <Link to={`/post/${id}`}>
                    <h3>{title}</h3>
                    <p className="item--text--data">
                        <span className="bold">{firstName}</span> from <span className="bold">{department}</span> started 1 day ago
                    </p>
                    <p>{description}</p>
                </Link>
                <div className="tags">
                    <Tag name={department} />
                    <Tag name={topic} />
                </div>
            </div>
            <div className="item--stats">
                <p><span className="bold">{commentsCount}</span> {commentsCount <= 1 ? 'comment' : 'comments'}</p>
                <p><span className="bold">{likesCount}</span> {likesCount <= 1 ? 'like' : 'likes'}</p>
            </div>
        </article>
    )
}