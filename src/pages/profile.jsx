import user from '../assets/user.png'
import '../utils/style/profile.css'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

export default function Profile() {
    return (
        <section className="profile">
            <h2 className="profile-title">Profile</h2>
            <div className="profile-info">
                <img src={user} alt="user avatar"></img>
                <div>
                    <p><span className="bold">Name: </span>Hannah Ganne</p>
                    <p><span className="bold">Department: </span>IT</p>
                </div>
            </div>
            <div className="profile-detail">
                <span className="bold uppercase">At work I'm expert in...</span>
                <p>Workflow management, Frontend development</p>
                <span className="bold uppercase">Personally I'm interested in...</span>
                <p>Parenting advice, yoga</p>
                <span className="bold uppercase">Describe yourself in one word</span>
                <p>I am a <span className='bold uppercase'>dedicated</span> person</p>
                <span className="bold uppercase">I am up for...</span>
                <p>Coffee chat, Zoom meeting, Afterwork happy hour, Office parties, Collaborations</p>
            </div>
            <Link to="/profile/edit">
                <Button className="btn red" name="Modify profile" />
            </Link>
        </section>
    )
}