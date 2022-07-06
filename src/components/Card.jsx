import Avatar from './Avatar'
import Tag from './Tag'
import '../utils/style/Card.css'
import { Link } from 'react-router-dom'

export default function Card(props) {
    return (
        <article>
            <Avatar />
            <div className="item--text">
                <Link to="/post/1">
                    <h3>Single Element Loaders: The Dots</h3>
                    <p className="item--text--data">
                        <span className="bold">Sarah</span> from <span className="bold">HR</span> started 1 day ago
                    </p>
                    <p>We're looking at loaders in this series. More than that, we're breaking down some common loader patterns and how to re-create them with nothing more than a single div. So far, weve picked apart the...</p>
                </Link>
                <div className="tags">
                    <Tag name="HR" />
                    <Tag name="News" />
                </div>
            </div>
            <div className="item--stats">
                <p><span className="bold">6</span> comments</p>
                <p><span className="bold">5</span> likes</p>
            </div>
        </article>
    )
}