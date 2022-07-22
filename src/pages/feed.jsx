import Card from '../components/Card'
import '../utils/style/Feed.css'
import { useOutletContext } from 'react-router-dom'

export default function Feed() {

    const [posts, setPosts] = useOutletContext();

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
            />
    })

    return (
    <section>
        <select className="sort-items">
            <option value="">Sort</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="mostPopular">Most Popular</option>
        </select>
        <div>
            {cardEl}
        </div>
    </section>
    )
}