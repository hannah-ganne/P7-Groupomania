import Card from '../components/Card'
import '../utils/style/Feed.css'

export default function Feed() {

    return (
    <section>
        <select className="sort-items">
            <option value="">Sort</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="mostPopular">Most Popular</option>
        </select>
        <div>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    </section>
    )
}